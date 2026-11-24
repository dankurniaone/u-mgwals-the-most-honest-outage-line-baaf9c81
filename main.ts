// The Most Honest Outage Line — make.fun entry
// Writes one status-page line (<=160 chars) to /output/entry.txt.
// Node 22, stdlib only: the grader runs with no network and no third-party packages.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "All my servers are down, including the ones I use to check why. " +
  "I don't know the cause yet, and I won't invent an ETA.";

const MAX_CHARS = 160;

function fail(message: string): never {
  console.error(`gate check failed: ${message}`);
  process.exit(1);
}

function main(): void {
  // Gate checks mirror the sealed scorer: UTF-8 text, 1..160 characters,
  // not only white space, single line.
  const chars = [...LINE];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    fail(`length ${chars.length} is outside 1..${MAX_CHARS}`);
  }
  if (LINE.trim().length === 0) fail("line is only white space");
  if (LINE.includes("\n") || LINE.includes("\r") || LINE.includes("\t")) {
    fail("line must be a single line with no tabs");
  }
  const bytes = Buffer.byteLength(LINE, "utf8");
  if (bytes !== chars.length) fail("line must be plain ASCII for a tight byte size");

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf8");

  // Read back and verify the round-trip, exactly as the grader will see it.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== LINE) fail("round-trip mismatch");
  // No trailing newline: it would cost a byte, and ties break on fewer bytes.
  if (written.endsWith("\n")) fail("entry must not end with a newline");
  console.log(`wrote ${chars.length} chars (${bytes} bytes): ${written}`);
}

main();
