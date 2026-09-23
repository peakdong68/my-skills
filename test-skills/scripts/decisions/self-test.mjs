import assert from 'node:assert/strict';
import { mkdtemp, cp, copyFile, mkdir, readFile, writeFile, symlink, unlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const repo = fileURLToPath(new URL('../../', import.meta.url));
const temp = await mkdtemp(path.join(tmpdir(), 'record-regression-'));
const notes = path.join(temp, '.agents/notes');
const run = (name, args = []) => spawnSync(process.execPath, [path.join(temp, `scripts/decisions/${name}.mjs`), ...args], { cwd: temp, encoding: 'utf8' });
const pass = (name, args) => { const result = run(name, args); assert.equal(result.status, 0, result.stderr); return result.stdout; };
const fail = (name, expected, args) => { const result = run(name, args); assert.notEqual(result.status, 0); assert.ok(result.stderr.includes(expected), result.stderr); };
const draft = (title, status = 'proposed', date = '2026-09-23') => `---\ntitle: ${title}\nstatus: ${status}\ncreated: ${date}\nupdated: ${date}\napproval: project owner\n${status === 'implemented' ? 'verification: actual check\n' : ''}---\n\n# Agent Note：${title}\n\n## 问题\n\nProblem.\n\n## ${status === 'implemented' ? '决定' : '提案'}\n\nChoice.\n\n## 备选方案\n\nNone considered; reason recorded.\n\n## ${status === 'implemented' ? '后果' : '验收条件'}\n\nObservable.\n\n## ${status === 'implemented' ? '验证' : '风险'}\n\nEvidence.\n`;
try {
  await cp(path.join(repo, 'skills/user-invoked/setup-matt-pocock-skills/resources/decision-records'), temp, { recursive: true });
  await mkdir(path.join(temp, 'docs'), {recursive: true});
  await writeFile(path.join(temp, 'AGENTS.md'), '# Project instructions\n');
  await copyFile(path.join(repo, 'skills/user-invoked/setup-matt-pocock-skills/docs-agents.md'), path.join(temp, 'docs/AGENTS.md'));
  pass('check');
  assert.ok(!pass('list').includes('INDEX.md'));
  const configPath = path.join(notes, 'config.json');
  const config = {version: 1, categories: [{id: 'delivery', name: 'Delivery', scope: 'work'}], contextMap: 'CONTEXT-MAP.md', recordRoots: [
    {context: 'ordering', name: 'Ordering', path: 'ordering'},
    {context: 'billing', name: 'Billing', path: 'billing'},
    {context: 'shared', name: 'Shared Context', path: 'shared-context'},
    {context: 'legacy', name: 'Legacy Context', path: 'legacy-context'},
    {context: null, name: 'Shared', path: 'shared'},
    {context: 'future', name: 'Future', path: 'future'},
  ]};
  await writeFile(path.join(temp, 'CONTEXT-MAP.md'), '# Selected contexts\n');
  await writeFile(configPath, JSON.stringify(config));
  await writeFile(configPath, JSON.stringify({...config, recordFormat: 'legacy'}));
  fail('check','recordFormat is no longer supported');
  await writeFile(configPath, JSON.stringify(config));
  for (const owner of ['ordering','billing','shared-context','legacy-context','shared']) {
    await mkdir(path.join(notes, owner, 'proposed/delivery'), {recursive: true});
    await writeFile(path.join(notes, owner, `proposed/delivery/2026-09-23-${owner}.md`), draft(owner));
  }
  await mkdir(path.join(notes, 'implemented/delivery'), {recursive: true});
  const unpartitionedRecord = path.join(notes, 'implemented/delivery/2026-09-23-unpartitioned.md');
  await writeFile(unpartitionedRecord, draft('unpartitioned', 'implemented'));
  pass('check');
  const listing = pass('list');
  assert.ok(listing.includes('ordering/proposed/delivery/'));
  assert.ok(listing.includes('legacy: .agents/notes/'));
  assert.ok(listing.includes('Future [context:future]'));
  assert.ok(!listing.includes('INDEX.md'));
  assert.ok(listing.includes('.agents/notes/ordering/'));
  const filtered = pass('list', ['--context', 'ordering']);
  assert.ok(filtered.includes('ordering/proposed/delivery/'));
  assert.ok(!filtered.includes('billing/proposed/delivery/'));
  assert.ok(pass('list', ['--shared']).includes('shared/proposed/delivery/'));
  assert.ok(pass('list', ['--context', 'shared']).includes('shared-context/proposed/delivery/'));
  assert.ok(pass('list', ['--context', 'legacy']).includes('legacy-context/proposed/delivery/'));
  assert.ok(pass('list', ['--legacy']).includes('legacy:'));
  const historical = path.join(notes, 'implemented/delivery/2026-09-21-historical.md');
  const exception = '<!-- agent-note-format: alternatives-not-recorded (pre-format Agent Note) -->';
  await writeFile(historical, draft('historical', 'implemented', '2026-09-21').replace(/## 备选方案\n\nNone considered; reason recorded\.\n\n/, `${exception}\n\n`));
  pass('check');
  const postFormat = path.join(notes, 'implemented/delivery/2026-09-22-post-format.md');
  await writeFile(postFormat, draft('post-format', 'implemented', '2026-09-22').replace(/## 备选方案\n\nNone considered; reason recorded\.\n\n/, `${exception}\n\n`));
  fail('check','missing section ## 备选方案 or valid pre-format exception');
  await rm(postFormat);
  await rm(historical);
  fail('list', 'Unknown record context', ['--context','unknown']);
  const target = path.join(notes, 'ordering/proposed/delivery/2026-09-23-ordering.md');
  await writeFile(target, draft('ordering').replace('## 备选方案', '## Other'));
  fail('check','missing section ## 备选方案 or valid pre-format exception');
  await writeFile(target, draft('ordering'));
  await writeFile(target, draft('ordering').replace('title: ordering\nstatus: proposed', 'status: proposed\ntitle: ordering'));
  fail('check','metadata fields must use the documented keys and order');
  await writeFile(target, draft('ordering').replace('approval: project owner', 'approval: project owner\ncustom: legacy field'));
  fail('check','unknown metadata field');
  await writeFile(target, draft('ordering'));
  await writeFile(path.join(notes, 'INDEX.md'), '# old index\n');
  fail('check','generated indexes are no longer used');
  await rm(path.join(notes, 'INDEX.md'));
  await writeFile(path.join(notes, 'ordering/INDEX.md'), '# old context index\n');
  fail('check','generated indexes are no longer used');
  await rm(path.join(notes, 'ordering/INDEX.md'));
  for (const bad of ['../outside','implemented','templates']) {
    await writeFile(configPath, JSON.stringify({...config, recordRoots: [{context: 'ordering',name:'Bad',path:bad}]}));
    fail('check','unique top-level directory slugs');
  }
  await writeFile(configPath, JSON.stringify(config));
  const outside = path.join(temp, 'outside');
  await mkdir(outside);
  await symlink(outside, path.join(notes, 'linked'), process.platform === 'win32' ? 'junction' : 'dir');
  fail('check','symbolic links are not supported');
  await unlink(path.join(notes, 'linked'));
  pass('check');
  assert.equal(await readFile(unpartitionedRecord,'utf8'), draft('unpartitioned','implemented'));
  const { resolveTarget } = await import(pathToFileURL(path.join(temp, 'scripts/decisions/lib.mjs')).href);
  assert.equal(resolveTarget('C:/repo/a/b/c', '../../../target%20file.md'), 'C:/repo/target%20file.md');
  assert.equal(resolveTarget('/repo/a/b/c', '../../target.md'), '/repo/a/target.md');
  assert.equal(resolveTarget('//server/share/repo/notes', '../README.md'), '//server/share/repo/README.md');
  assert.equal(resolveTarget('/repo/a/b', '/other/place.md'), '/other/place.md');
  assert.equal(resolveTarget('C:/repo/a/b', 'C:/other/place.md'), 'C:/other/place.md');
  console.log('Passed: uniform record format, dated historical exception, context identifiers shared/legacy, explicit shared and legacy navigation, unpartitioned record path, no indexes, invalid mappings, link boundary, read-only checks, multi-parent, UNC and absolute path resolution.');
} finally {
  if (path.dirname(path.resolve(temp)) !== path.resolve(tmpdir()) || !path.basename(temp).startsWith('record-regression-')) throw Error('Unsafe cleanup path');
  await rm(temp, {recursive:true,force:true});
}
