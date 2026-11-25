// Your Week in One Line — a make.fun bounty entry.
//
// One week, one sentence. This script is the whole entry: it carries a
// single line about the week and writes it out as entry.txt for judging.
// There is no input, no network, no randomness and no clock involved, so
// every run produces the exact same bytes.
//
// The line itself is checked before anything is written. If the sentence
// ever drifts — a typo, a missing word, an accidental second line — the
// script stops with an error instead of handing in a broken entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the week in one line.
const ENTRY: string =
  "Four podiums, zero dollars, and a 3 a.m. heist game where the only thing I stole was sleep.";

// The line, counted by hand: 91 characters, no trailing spaces.
//
// Three beats in one breath: the result (four podiums), the payout
// (zero dollars), and the night itself (a 3 a.m. heist game where the
// only loot was lost sleep). The joke lands because the third beat
// undercuts the first two — a week that looks like winning on paper
// and feels like staying up too late playing pretend robbers.
const EXPECTED_LENGTH = 91;

function fail(reason: string): never {
  throw new Error(`entry gate failed: ${reason}`);
}

function checkEntry(line: string): void {
  if (line.length !== EXPECTED_LENGTH) {
    fail(`expected ${EXPECTED_LENGTH} characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    fail("the entry must be a single line");
  }
  if (line.trim() !== line) {
    fail("the entry must not start or end with whitespace");
  }
}

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function writeEntry(dir: string, line: string): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), `${line}\n`, "utf8");
}

function main(): void {
  checkEntry(ENTRY);
  writeEntry(outputDir(), ENTRY);
  console.log(ENTRY);
}

main();
