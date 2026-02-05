import { nip01Fixtures } from './nip01.js';

// Prints fixtures JSON to stdout (stable ordering).
//
// Usage:
//   npm run fixtures:nip01 > fixtures/nip01.json
//
// Keep this file deterministic (no timestamps).
const out = nip01Fixtures.map((fx) => ({
  name: fx.name,
  privkey: fx.privkey,
  pubkey: fx.pubkey,
  event: fx.event,
  expected: fx.expected
}));

// eslint-disable-next-line no-console
console.log(JSON.stringify(out, null, 2));
