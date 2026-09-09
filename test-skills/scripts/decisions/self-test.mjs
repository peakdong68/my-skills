import assert from 'node:assert/strict';
import { mkdtemp, cp, mkdir, readFile, writeFile, rename, rm, rmdir } from 'node:fs/promises';
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
  console.log('Passed: empty deployment, custom classification, approval/delivery separation, lifecycle checks, dates, links, stale index, non-mutating repeated maintenance.');
} finally {
  const expectedParent = path.resolve(tmpdir());
  if (path.dirname(path.resolve(temp)) !== expectedParent || !path.basename(temp).startsWith('record-regression-')) throw Error('Unsafe temporary cleanup path');
  await rm(temp, { recursive: true, force: true });
}
