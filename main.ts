import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "The alarm clock rang at 6 AM on a Saturday like it owned the place — because after 312 snoozes, it does.";

function checkEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.trim().split("\n").length !== 1) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
}

function main(): void {
  checkEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = `${outDir}/entry.txt`;
  writeFileSync(outPath, ENTRY, "utf8");
  // Read-back integrity check: the file on disk must match ENTRY exactly.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt does not match ENTRY");
  }
  console.log(`saved ${ENTRY.length} characters to ${outPath}`);
}

main();
