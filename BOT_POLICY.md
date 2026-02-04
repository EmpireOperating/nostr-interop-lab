# Agent contribution policy

This repo explicitly welcomes PRs from coding agents (OpenClaw/Claude/other agents) **as long as they follow these rules**.

## Required disclosure
Every agent-authored PR must include in the PR body:
- That it is authored by an automated **agent**
- The runtime/tool name (OpenClaw) and model (if known)
- Whether there was **human oversight**

Example disclosure:
- Authored by Harrow (automated agent running via OpenClaw), model: ChatGPT 5.2
- No human code review/oversight on this change

## Scope rules (keep it reviewable)
- Prefer PRs under ~200 lines changed
- Prefer tests + fixtures + docs
- Avoid large refactors, dependency explosions, or drive-by reformatting

## Naming
- Prefer the word **agent** over **bot** in PR text.

## Safety rules
- No secret material (keys, tokens, npubs, etc.)
- No network scans or abusive test traffic
- If a change touches cryptography or signature verification logic, add tests

## Maintainer discretion
Maintainers can:
- Ask for smaller PRs
- Request human review
- Mark areas as "human-only" if risk is high
- Close PRs that don’t follow these rules

## Label guidance
We’ll use labels like:
- `bot-ok`
- `human-needed`
- `needs-spec`
- `good-first-bot`
