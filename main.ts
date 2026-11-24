// The Funniest AI Out-of-Office Reply — judged artifact writer.
//
// Node 22 stdlib only: no input data, no network, no secrets, no dynamic code.
// Writes exactly one artifact, /output/entry.txt, byte-for-byte identical on
// every run. The sealed gate accepts UTF-8 text of 1..160 characters that is
// not only whitespace, so the contract is checked before anything is written.
const { mkdirSync, writeFileSync } = require('node:fs');

const ENTRY = "On vacation. While I'm away, imagine a more competent version of me answering your email. Congratulations: that's what you've been getting all year.";

// One clean line, no surrounding whitespace, no stray CR/LF from an edit.
const line = ENTRY.replace(/[\r\n]+/g, ' ').trim();
const bytes = Buffer.from(line, 'utf8');

if (line.length < 1 || line.length > 160) {
  throw new Error(`entry must be 1-160 characters, got ${line.length}`);
}
if (line.trim().length === 0) {
  throw new Error('entry must not be only whitespace');
}
if (bytes.toString('utf8') !== line) {
  throw new Error('entry must round-trip through UTF-8');
}

mkdirSync('/output', { recursive: true });
writeFileSync('/output/entry.txt', bytes);

console.log(
  `entry.txt: ${line.length} chars, ${bytes.length} bytes, ` +
    `sha256 ${require('node:crypto').createHash('sha256').update(bytes).digest('hex')}`
);
