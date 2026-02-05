import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

import { nip01Fixtures } from '../src/fixtures/nip01.js';

function normalize(fixtures: any[]) {
  return fixtures.map((fx) => ({
    name: fx.name,
    privkey: fx.privkey,
    pubkey: fx.pubkey,
    event: fx.event,
    expected: fx.expected
  }));
}

test('fixtures: fixtures/nip01.json matches src/fixtures/nip01.ts', async () => {
  const p = path.join(process.cwd(), 'fixtures', 'nip01.json');
  const raw = await fs.readFile(p, 'utf8');
  const disk = JSON.parse(raw);

  assert.deepEqual(normalize(disk), normalize(nip01Fixtures));
});
