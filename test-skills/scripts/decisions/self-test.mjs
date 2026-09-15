import assert from 'node:assert/strict';
import { mkdtemp, cp, mkdir, readFile, writeFile, rename, rm, rmdir, symlink, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const repo = fileURLToPath(new URL('../../', import.meta.url));
const temp = await mkdtemp(path.join(tmpdir(), 'record-regression-'));
const docs = path.join(temp, '.agents/notes');
const run = name => spawnSync(process.execPath, [path.join(temp, `scripts/decisions/${name}.mjs`)], { cwd: temp, encoding: 'utf8' });
const pass = name => { const r = run(name); assert.equal(r.status, 0, r.stderr); return r; };
const fail = expected => { const r = run('check'); assert.equal(r.status, 1); assert.ok(r.stderr.includes(expected), r.stderr); };
try {
  await cp(path.join(repo, 'skills/user-invoked/setup-matt-pocock-skills/resources/decision-records'), temp, { recursive: true });
  pass('update-index'); pass('check');
  const emptyConfig = JSON.parse(await readFile(path.join(docs, 'config.json'), 'utf8'));
  assert.deepEqual(emptyConfig.categories, []);
  const index = await readFile(path.join(docs, 'INDEX.md'), 'utf8');
  assert.ok(index.includes('尚未配置项目分类'));
  await writeFile(path.join(docs, 'config.json'), JSON.stringify({ version: 1, categories: [{ id: 'billing', name: 'Billing', scope: 'Invoice delivery' }] }));
  await mkdir(path.join(docs, 'proposed/billing'), { recursive: true });
  let recordPath = path.join(docs, 'proposed/billing/2026-09-08-invoices.md');
  const draft = '---\ntitle: Invoice delivery\nstatus: proposed\ncreated: 2026-09-08\nupdated: 2026-09-08\napproval: accepted by project owner; execution pending\n---\n\n# Invoice delivery\n\nProject-specific headings are allowed.\n';
  await writeFile(recordPath, draft);
  fail('missing or stale'); pass('update-index'); pass('check');
  await writeFile(recordPath, draft.replace('status: proposed', 'status: implemented'));
  fail('status must match');
  await writeFile(recordPath, draft.replace('2026-09-08\nupdated', '2026-02-30\nupdated'));
  fail('invalid created');
  await writeFile(recordPath, draft + '\n[missing](./missing.md)\n'); fail('broken local link');
  await writeFile(recordPath, draft); await mkdir(path.join(docs, 'implemented/billing'), { recursive: true });
  const deliveredPath = path.join(docs, 'implemented/billing/2026-09-08-invoices.md');
  await rename(recordPath, deliveredPath); recordPath = deliveredPath;
  await writeFile(recordPath, draft.replace('status: proposed', 'status: implemented')); fail('verification reference');
  const delivered = draft.replace('status: proposed', 'status: implemented').replace('approval:', 'verification: project acceptance evidence\napproval:');
  await writeFile(recordPath, delivered); pass('update-index'); pass('check');
  await mkdir(path.join(docs, 'rejected/billing'), { recursive: true });
  const rejectedPath = path.join(docs, 'rejected/billing/2026-09-08-invoices.md');
  await rename(recordPath, rejectedPath); recordPath = rejectedPath;
  await writeFile(recordPath, draft.replace('status: proposed', 'status: rejected')); fail('rejection reason');
  await writeFile(recordPath, draft.replace('status: proposed', 'status: rejected').replace('approval:', 'reason: declined by project owner\napproval:'));
  pass('update-index'); pass('check');
  await mkdir(path.join(docs, 'proposed/unknown'), { recursive: true }); fail('unknown project category');
  await rmdir(path.join(docs, 'proposed/unknown'));
  // Generation and validation never overwrite project configuration or customized scripts.
  const lib = path.join(temp, 'scripts/decisions/lib.mjs');
  const customLib = (await readFile(lib, 'utf8')) + '\n// project customization\n';
  await writeFile(lib, customLib); const customConfig = await readFile(path.join(docs, 'config.json'), 'utf8');
  pass('update-index'); pass('check'); pass('update-index'); pass('check');
  assert.equal(await readFile(lib, 'utf8'), customLib);
  assert.equal(await readFile(path.join(docs, 'config.json'), 'utf8'), customConfig);
  // Context roots isolate record trees while preserving historical owners.
  const scopedConfig = { ...JSON.parse(customConfig), contextMap: 'CONTEXT-MAP.md', recordRoots: [
    { context: 'ordering', name: 'Ordering', path: 'ordering' },
    { context: 'billing', name: 'Billing', path: 'billing' },
    { context: null, name: 'Shared', path: 'shared' },
    { context: 'future', name: 'Future', path: 'future' },
  ] };
  await writeFile(path.join(temp, 'CONTEXT-MAP.md'), '# Contexts\n\nordering, billing, future\n');
  const configPath = path.join(docs, 'config.json');
  await writeFile(configPath, JSON.stringify(scopedConfig));
  for (const scope of ['ordering', 'billing', 'shared']) {
    await mkdir(path.join(docs, scope, 'proposed/billing'), { recursive: true });
    await writeFile(path.join(docs, scope, `proposed/billing/2026-09-08-${scope}.md`), draft.replace('Invoice delivery', `${scope} decision`));
  }
  pass('update-index'); pass('check');
  const rootIndex = await readFile(path.join(docs, 'INDEX.md'), 'utf8');
  assert.ok(rootIndex.includes('./ordering/INDEX.md'));
  assert.ok(rootIndex.includes('./rejected/billing/2026-09-08-invoices.md'));
  assert.ok(!rootIndex.includes('ordering/proposed/billing'));
  const orderingIndex = await readFile(path.join(docs, 'ordering/INDEX.md'), 'utf8');
  assert.ok(orderingIndex.includes('./proposed/billing/2026-09-08-ordering.md'));
  assert.ok(!orderingIndex.includes('2026-09-08-billing.md'));
  await assert.rejects(readFile(path.join(docs, 'future/INDEX.md')), { code: 'ENOENT' });
  await writeFile(path.join(docs, 'ordering/INDEX.md'), orderingIndex + 'stale');
  fail('ordering/INDEX.md: missing or stale'); pass('update-index'); pass('check');
  for (const bad of ['../outside', '/outside', 'implemented', 'templates']) {
    await writeFile(configPath, JSON.stringify({...scopedConfig, recordRoots: [{context: 'ordering', name: 'Bad', path: bad}]}));
    fail('unique top-level directory slugs');
  }
  await writeFile(configPath, JSON.stringify({...scopedConfig, recordRoots: [...scopedConfig.recordRoots, {context: 'ordering', name: 'Duplicate', path: 'duplicate'}]}));
  fail('one record root');
  await writeFile(configPath, JSON.stringify({...scopedConfig, contextMap: 'missing-map.md'}));
  fail('config.json:');
  await writeFile(configPath, JSON.stringify(scopedConfig));
  await mkdir(path.join(docs, 'unselected/proposed/billing'), { recursive: true });
  fail('unknown lifecycle directory');
  await rmdir(path.join(docs, 'unselected/proposed/billing'));
  await rmdir(path.join(docs, 'unselected/proposed'));
  await rmdir(path.join(docs, 'unselected'));
  const outside = path.join(temp, 'outside');
  await mkdir(outside);
  await writeFile(path.join(outside, 'INDEX.md'), 'must remain unchanged');
  await symlink(outside, path.join(docs, 'linked'), process.platform === 'win32' ? 'junction' : 'dir');
  await writeFile(configPath, JSON.stringify({...scopedConfig, recordRoots: [{context: null, name: 'Linked', path: 'linked'}]}));
  fail('real directories');
  assert.equal(run('update-index').status, 1);
  assert.equal(await readFile(path.join(outside, 'INDEX.md'), 'utf8'), 'must remain unchanged');
  await unlink(path.join(docs, 'linked'));
  await writeFile(configPath, JSON.stringify(scopedConfig));
  pass('update-index'); pass('check');
  assert.equal(await readFile(configPath, 'utf8'), JSON.stringify(scopedConfig));
  assert.equal(await readFile(recordPath, 'utf8'), draft.replace('status: proposed', 'status: rejected').replace('approval:', 'reason: declined by project owner\napproval:'));
  console.log('Passed: empty deployment, custom classification, approval/delivery separation, lifecycle checks, dates, links, stale index, non-mutating repeated maintenance, isolated context indexes, shared scope, lazy directories, invalid mappings and legacy coexistence.');
} finally {
  const expectedParent = path.resolve(tmpdir());
  if (path.dirname(path.resolve(temp)) !== expectedParent || !path.basename(temp).startsWith('record-regression-')) throw Error('Unsafe temporary cleanup path');
  await rm(temp, { recursive: true, force: true });
}
