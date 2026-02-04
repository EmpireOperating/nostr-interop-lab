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
(Initial scaffold — coming next)

## Contributing
- Read `BOT_POLICY.md`
- Prefer: tests, fixtures, docs, small bugfixes

## License
MIT
