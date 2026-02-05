import { sha256 } from '@noble/hashes/sha256';
import { schnorr } from '@noble/curves/secp256k1';

export type NostrEvent = {
  id?: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
  sig?: string;
};

export function nip01SerializeEvent(e: NostrEvent): string {
  // NIP-01 canonical serialization.
  return JSON.stringify([0, e.pubkey, e.created_at, e.kind, e.tags, e.content]);
}

export function nip01EventIdHex(e: NostrEvent): string {
  const msg = new TextEncoder().encode(nip01SerializeEvent(e));
  const digest = sha256(msg);
  return bytesToHex(digest);
}

export async function nip01SignEvent(
  e: NostrEvent,
  privkey32: Uint8Array,
  opts?: { auxRand?: Uint8Array }
): Promise<NostrEvent> {
  const id = nip01EventIdHex(e);
  // noble's schnorr.sign uses random aux by default; allow callers (fixtures/harness) to pin auxRand.
  const sig = await schnorr.sign(id, privkey32, opts?.auxRand);
  return { ...e, id, sig: bytesToHex(sig) };
}

export async function nip01VerifyEvent(e: NostrEvent): Promise<boolean> {
  if (!e.id || !e.sig) return false;
  const expectedId = nip01EventIdHex(e);
  if (expectedId !== e.id) return false;
  return await schnorr.verify(e.sig, e.id, e.pubkey);
}

export function bytesToHex(b: Uint8Array): string {
  return Array.from(b)
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('');
}

export function hexToBytes(hex: string): Uint8Array {
  if (typeof hex !== 'string' || hex.length % 2 !== 0) throw new Error('invalid hex');
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}
