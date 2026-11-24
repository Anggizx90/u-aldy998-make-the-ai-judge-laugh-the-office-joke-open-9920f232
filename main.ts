// Make the AI Judge Laugh: the Office Joke Open
// Writes one original one-line office joke to /output/entry.txt.
//
// The joke (82 characters):
//   I automated my status updates, and now the script attends more meetings than I do.
//
// Why this line: the setup is a real office move everyone recognises
// (automating the status update), and the punch lands in the last few
// words — the tool built to free me from meetings now does the
// meeting-going, and I am still the one without time. A genuine one-line
// joke, tight, fresh (no Monday morning, no photocopier, no reply-all
// storm), and it needs no explaining. See JOKES.md for the 28 candidates
// scored against the judge's five criteria and the iteration that picked it.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Entry text. The joke must stand on its own as something a tired office
// worker would laugh at: no mention of make.fun, AI, judges, or the contest.
const JOKE =
  "I automated my status updates, and now the script attends more meetings than I do.";

// Words the entry must never contain: the joke is judged as a joke, and any
// meta-commentary about the contest would break the spell for the reader.
const FORBIDDEN = ["make.fun", "makefun", "judge", "contest", "bounty"];

function main(): void {
  // Runtime self-check: the gate needs UTF-8 text of 1-200 characters,
  // not only whitespace, on a single line.
  const chars = [...JOKE].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`joke is ${chars} characters, must be 1-200`);
  }
  if (JOKE.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
  if (JOKE.includes("\n") || JOKE.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  const lower = JOKE.toLowerCase();
  for (const word of FORBIDDEN) {
    if (lower.includes(word)) {
      throw new Error(`joke must not mention ${word}`);
    }
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
  console.log(`wrote ${chars}-character joke to ${join(outDir, "entry.txt")}`);
}

main();
