import { readdir, readFile, access, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
export const root = fileURLToPath(new URL('../../.agents/notes/', import.meta.url));
export const lifecycles = ['proposed', 'implemented', 'rejected'];
const dateOK = v => /^\d{4}-\d{2}-\d{2}$/.test(v ?? '') && !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0,10) === v;
const cell = v => String(v ?? '').replaceAll('|','\\|').replaceAll('[','\\[').replaceAll(']','\\]');
export async function collect({ignoreIndex = false} = {}) {
  const errors = [], records = [], documents = [];
  let categories = [], recordRoots = [];
  try {
    const config = JSON.parse(await readFile(path.join(root,'config.json'),'utf8'));
    if (config.version !== 1 || !Array.isArray(config.categories)) throw Error('expected version 1 and categories array');
    const ids = new Set();
    for (const c of config.categories) {
      if (!c || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.id ?? '') || ![c.name,c.scope].every(v => typeof v === 'string' && v.trim() && !/[\r\n]/.test(v)) || ids.has(c.id)) throw Error('categories require unique slug ids, names and scopes');
      ids.add(c.id);
    }
    categories = config.categories;
    if (config.recordRoots !== undefined) {
      if (!Array.isArray(config.recordRoots)) throw Error('recordRoots must be an array');
      const paths = new Set(), contexts = new Set();
      for (const r of config.recordRoots) {
        if (!r || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.path ?? '') || [...lifecycles,'templates'].includes(r.path) || paths.has(r.path)) throw Error('recordRoots require unique top-level directory slugs');
        if (typeof r.name !== 'string' || !r.name.trim() || /[\r\n]/.test(r.name)) throw Error('recordRoots require names');
        if (r.context !== null && (typeof r.context !== 'string' || !r.context.trim() || /[\r\n]/.test(r.context))) throw Error('recordRoots require a context identifier or null for shared');
        if (contexts.has(r.context)) throw Error('each context or shared scope must have one record root');
        const stat = await lstat(path.join(root,r.path)).catch(e => { if (e.code === 'ENOENT') return null; throw e; });
        if (stat && (!stat.isDirectory() || stat.isSymbolicLink())) throw Error('recordRoots must be real directories within Notes, not links or files');
        paths.add(r.path); contexts.add(r.context);
      }
      if (config.recordRoots.some(r => r.context !== null)) {
        if (typeof config.contextMap !== 'string' || !config.contextMap.trim()) throw Error('contextMap required for context record roots');
        await access(path.resolve(root, '../..', config.contextMap));
      }
      recordRoots = config.recordRoots;
    }
  } catch (e) { errors.push(`config.json: ${e.message}`); }
  const ids = categories.map(c => c.id);
  async function walk(dir) {
    for (const e of await readdir(dir,{withFileTypes:true})) {
      const full = path.join(dir,e.name), rel = path.relative(root,full).replaceAll('\\','/'), parts = rel.split('/');
      if (e.isSymbolicLink()) { errors.push(`${rel}: symbolic links are not supported in Notes`); continue; }
      if (e.isDirectory()) {
        if (parts[0] !== 'templates') {
          const scoped = recordRoots.some(r => r.path === parts[0]);
          const local = scoped ? parts.slice(1) : parts;
          if (local.length === 1 && !lifecycles.includes(e.name)) errors.push(`${rel}: unknown lifecycle directory`);
          if (local.length === 2 && !ids.includes(e.name)) errors.push(`${rel}: unknown project category`);
          if (local.length > 2) errors.push(`${rel}: nested record directory not supported`);
        }
        await walk(full);
      } else if (e.isFile() && e.name.endsWith('.md')) documents.push(full);
    }
  }
  await walk(root);
  for (const full of documents.sort()) {
    const relative = path.relative(root,full).replaceAll('\\','/');
    const owner = recordRoots.find(r => relative.startsWith(r.path + '/'));
    const localRelative = owner ? relative.slice(owner.path.length + 1) : relative;
    if (ignoreIndex && localRelative === 'INDEX.md') continue;
    const text = await readFile(full,'utf8'), parts = localRelative.split('/');
    if (!(relative === 'README.md' || localRelative === 'INDEX.md') && !relative.startsWith('templates/')) {
      const name = /^(\d{4}-\d{2}-\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.exec(parts[2] ?? '');
      if (parts.length !== 3 || !lifecycles.includes(parts[0]) || !ids.includes(parts[1]) || !name) { errors.push(`${relative}: invalid lifecycle, category or filename`); continue; }
      const header = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text), meta = {};
      if (!header) errors.push(`${relative}: missing metadata`);
      for (const line of (header?.[1] ?? '').split(/\r?\n/)) {
        const f = /^([a-z]+): (.+)$/.exec(line);
        if (!f || Object.hasOwn(meta,f[1])) { errors.push(`${relative}: invalid or duplicate metadata field`); continue; }
        meta[f[1]] = f[2].trim();
      }
      if (!meta.title) errors.push(`${relative}: title required`);
      if (meta.status !== parts[0]) errors.push(`${relative}: status must match lifecycle directory`);
      for (const key of ['created','updated']) if (!dateOK(meta[key])) errors.push(`${relative}: invalid ${key}`);
      if (meta.created !== name[1]) errors.push(`${relative}: filename date differs from created`);
      if (meta.updated < meta.created) errors.push(`${relative}: updated precedes created`);
      if (!meta.approval) errors.push(`${relative}: approval evidence or pending statement required`);
      if (meta.status === 'implemented' && !meta.verification) errors.push(`${relative}: verification reference or explanation required`);
      if (meta.status === 'rejected' && !meta.reason) errors.push(`${relative}: rejection reason required`);
      if (!/^# .+/m.test(text.slice(header?.[0].length ?? 0))) errors.push(`${relative}: document title required`);
      records.push({...meta, category:parts[1], relative, recordRoot: owner?.path ?? ''});
    }
    const body = text.replace(/```[\s\S]*?```/g,'').replace(/`[^`\n]+`/g,'');
    for (const link of body.matchAll(/\[[^\]]*\]\((<[^>]+>|[^\s)]+)\)/g)) {
      const target = link[1].replace(/^<|>$/g,'').split('#')[0];
      if (!target || /^[a-z][a-z\d+.-]*:/i.test(target)) continue;
      try {
        const dest = path.resolve(path.dirname(full),decodeURIComponent(target));
        if (ignoreIndex && [root,...recordRoots.map(r => path.join(root,r.path))].some(dir => dest === path.join(dir,'INDEX.md'))) continue;
        await access(dest);
      } catch { errors.push(`${relative}: broken local link ${target}`); }
    }
  }
  const names = new Set();
  for (const r of records) { const name = path.basename(r.relative); if (names.has(name)) errors.push(`${r.relative}: duplicate record filename`); names.add(name); }
  return {records,categories,recordRoots,errors};
}
export function renderIndex(records,categories) {
  const lines = ['# Agent Notes 索引','','<!-- Generated by scripts/decisions/update-index.mjs. Do not edit manually. -->','','规则见 [README](./README.md)，分类来源为 [项目配置](./config.json)。生命周期表示交付情况，批准与执行授权分别依据项目约定。',''];
  function section(title,groups,field) {
    lines.push(`## ${title}`,'');
    for (const g of groups) {
      lines.push(`### ${cell(g.name)}`,''); if (g.scope) lines.push(g.scope,'');
      const rows = records.filter(r => r[field] === g.id).sort((a,b) => b.created.localeCompare(a.created) || a.relative.localeCompare(b.relative));
      if (!rows.length) { lines.push('暂无记录。',''); continue; }
      lines.push('| 首次提出 | 记录 | 分类 | 生命周期 |','| --- | --- | --- | --- |');
      for (const r of rows) lines.push(`| ${r.created} | [${cell(r.title)}](./${r.relative}) | ${r.category} | ${r.status} |`);
      lines.push('');
    }
  }
  section('按交付生命周期',lifecycles.map(id => ({id,name:id})),'status');
  if (categories.length) section('按项目分类',categories,'category');
  else lines.push('## 按项目分类','','尚未配置项目分类；首份记录创建前先确定分类。','');
  return lines.join('\n');
}

// Root navigation and per-context indexes share one rendering implementation.
// Registering a future root does not create its directory or index.
export async function renderIndexes(records, categories, recordRoots) {
  const indexes = new Map();
  const navigation = ['## 按记录目录导航', ''];
  for (const owner of recordRoots) {
    const exists = await access(path.join(root, owner.path)).then(() => true, () => false);
    const label = `${cell(owner.name)} (${cell(owner.context ?? '公共记录')})`;
    navigation.push(exists ? `- [${label}](./${owner.path}/INDEX.md)` : `- ${label} — 已登记，尚无目录`);
    if (!exists) continue;
    const rows = records.filter(r => r.recordRoot === owner.path).map(r => ({...r, relative: r.relative.slice(owner.path.length + 1)}));
    const body = renderIndex(rows, categories).replace('[README](./README.md)', '[README](../README.md)').replace('[项目配置](./config.json)', '[项目配置](../config.json)');
    indexes.set(`${owner.path}/INDEX.md`, body + '\n[返回总索引](../INDEX.md)\n');
  }
  // Historical unpartitioned records remain discoverable without migration.
  let main = renderIndex(records.filter(r => !r.recordRoot), categories);
  if (recordRoots.length) main = main.replace('## 按交付生命周期', navigation.join('\n') + '\n\n以下为原有根级记录；上下文记录见各目录索引。\n\n## 按交付生命周期');
  indexes.set('INDEX.md', main);
  return indexes;
}
