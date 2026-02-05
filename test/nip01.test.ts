import test from 'node:test';
import assert from 'node:assert/strict';

import { nip01Fixtures } from '../src/fixtures/nip01.js';
import { nip01EventIdHex, nip01VerifyEvent } from '../src/nostr.js';

test('NIP-01 fixtures: id and sig verify', async () => {
  for (const fx of nip01Fixtures) {
    const id = nip01EventIdHex(fx.event);
    assert.equal(id, fx.expected.id, `id mismatch for ${fx.name}`);

    const signed = { ...fx.event, id: fx.expected.id, sig: fx.expected.sig };
    const ok = await nip01VerifyEvent(signed);
    assert.equal(ok, true, `verify failed for ${fx.name}`);
  }
});
