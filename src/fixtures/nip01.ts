import { hexToBytes, nip01EventIdHex, nip01SignEvent, type NostrEvent } from '../nostr.js';

export type NIP01Fixture = {
  name: string;
  privkey: string; // hex
  pubkey: string; // hex
  event: Omit<NostrEvent, 'id' | 'sig'>;
  expected: {
    id: string;
    sig: string;
  };
};

// Fixtures are generated deterministically from a fixed privkey and static event fields.
// This is useful for interop tests across languages.
const FIXTURES: NIP01Fixture[] = [];

async function makeFixture(name: string, privkeyHex: string, event: Omit<NostrEvent, 'id' | 'sig'>): Promise<NIP01Fixture> {
  const privkey = hexToBytes(privkeyHex);
  // schnorr.getPublicKey returns 32-byte pubkey (x-only) for noble curves.
  const { schnorr } = await import('@noble/curves/secp256k1');
  const pubkey = Array.from(schnorr.getPublicKey(privkey))
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');

  const eventWithPubkey = { ...event, pubkey };

  const id = nip01EventIdHex(eventWithPubkey);
  const signed = await nip01SignEvent(eventWithPubkey, privkey);

  return {
    name,
    privkey: privkeyHex,
    pubkey,
    event: eventWithPubkey,
    expected: { id, sig: signed.sig! }
  };
}

// Note: created_at is fixed to avoid time variance.
const PRIVKEY_1 = '0000000000000000000000000000000000000000000000000000000000000001';

FIXTURES.push(
  await makeFixture('nip01-kind1-minimal', PRIVKEY_1, {
    pubkey: '00'.repeat(32), // placeholder replaced by makeFixture
    created_at: 1,
    kind: 1,
    tags: [],
    content: 'hello nostr'
  })
);

FIXTURES.push(
  await makeFixture('nip01-kind1-with-tags', PRIVKEY_1, {
    pubkey: '00'.repeat(32),
    created_at: 2,
    kind: 1,
    tags: [
      ['p', 'f'.repeat(64)],
      ['e', 'a'.repeat(64), 'wss://example.com', 'root']
    ],
    content: 'hello tags'
  })
);

FIXTURES.push(
  await makeFixture('nip01-kind0-metadata-minimal', PRIVKEY_1, {
    pubkey: '00'.repeat(32),
    created_at: 3,
    kind: 0,
    tags: [],
    // NOTE: NIP-01 treats content as an opaque string. Some clients put JSON here (NIP-05 style metadata).
    content: JSON.stringify({ name: 'alice', about: 'hello', picture: 'https://example.com/p.png' })
  })
);

FIXTURES.push(
  await makeFixture('nip01-kind7-reaction-like', PRIVKEY_1, {
    pubkey: '00'.repeat(32),
    created_at: 4,
    kind: 7,
    tags: [
      ['e', 'b'.repeat(64)],
      ['p', 'c'.repeat(64)]
    ],
    content: '+'
  })
);

export const nip01Fixtures = FIXTURES;
