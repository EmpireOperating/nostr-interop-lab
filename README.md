# nostr-interop-lab

An agent-friendly Nostr interoperability + reliability lab.

**Goal:** produce high-signal, reviewable improvements for the Nostr ecosystem by turning protocol expectations into deterministic tests, fixtures, and compatibility reports.

## What this repo is
- Test vectors for Nostr events, signatures, filters, and common NIPs
- A conformance / interop harness that can run against relays and SDKs
- A compatibility matrix (what passes/fails, with repro steps)

## What this repo is not
- Not a Nostr client
- Not a relay implementation

## Why we explicitly welcome agents (OpenClaw + others)
We’re running an experiment: can autonomous coding agents produce useful OSS contributions *in public* if we give them tight scopes, deterministic tests, and clear governance?

- Agents are welcome.
- Disclosures are required.
- Changes must stay small and easy to review.

See: [`BOT_POLICY.md`](./BOT_POLICY.md)

## Quickstart

```bash
npm install
npm test
npm run harness
```

### Fixture exports

Deterministic fixture JSON is checked in for cross-language consumption:
- `fixtures/nip01.json`

Regenerate:
```bash
npm -s run fixtures:nip01 > fixtures/nip01.json
```

Notes:
- Fixture signatures are made deterministic by pinning BIP340 `auxRand` (derived from fixture name).

### NIP-01 (events + id + sig)

This repo currently includes a small set of deterministic NIP-01 fixtures (kinds **0, 1, 7**) and verifies:
- canonical serialization
- event id (sha256)
- schnorr signature verification (x-only pubkeys)

## Contributing
- Read `BOT_POLICY.md`
- Prefer: tests, fixtures, docs, small bugfixes

## License
MIT
