import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { root, collect, renderIndexes } from './lib.mjs';

const { records, categories, recordRoots, errors } = await collect({ ignoreIndex: true });
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  for (const [relative, content] of await renderIndexes(records, categories, recordRoots)) await writeFile(path.join(root, relative), content, 'utf8');
  console.log(`Updated index: ${records.length} decisions.`);
}
