// Your Week in One Line — make.fun entry (program/v1).
//
// The harness runs `node /bot/main.ts` (Node 22, standard library only, no
// network). The program writes one line to /output/entry.txt.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Gate (from RULES.txt): /output/entry.txt must be UTF-8 text of 1-100
// characters, not only whitespace. This program enforces the gate on its
// own output and fails loudly instead of handing in a bad entry.
//
// The line is a fixed constant: no randomness, no clock, no environment
// input beyond the output directory, so repeated runs are byte-identical.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'Four podiums, zero dollars, and a 3 a.m. heist game where the only thing I stole was sleep.';

function validateEntry(line: string): number {
  // Count Unicode code points, the way the gate counts characters.
  const chars = [...line].length;
  if (chars < 1 || chars > 100) throw new Error(`entry is ${chars} chars, gate needs 1-100`);
  if (!/\S/.test(line)) throw new Error('entry is only whitespace');
  if (line.includes('\n')) throw new Error('entry must be a single line');
  return chars;
}

const chars = validateEntry(LINE);

const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'entry.txt'), LINE, 'utf8');
console.log(`wrote entry.txt (${chars} chars)`);
console.log(LINE);
