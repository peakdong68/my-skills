import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { root, collect, renderIndexes } from './lib.mjs';

const { records, categories, recordRoots, errors } = await collect();
if (!errors.length) for (const [relative, expected] of await renderIndexes(records, categories, recordRoots)) {
  const index = await readFile(path.join(root, relative), 'utf8').catch(() => null);
  if (index !== expected) errors.push(`${relative}: missing or stale; run node scripts/decisions/update-index.mjs`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else console.log(`Decision checks passed: ${records.length} records. Approval evidence and factual accuracy require review.`);
