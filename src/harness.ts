import { nip01Fixtures } from './fixtures/nip01.js';
import { nip01VerifyEvent } from './nostr.js';

export async function runHarness() {
  const results = [] as Array<{ name: string; ok: boolean; detail?: string }>;

  for (const fx of nip01Fixtures) {
    const signed = { ...fx.event, id: fx.expected.id, sig: fx.expected.sig };
    const ok = await nip01VerifyEvent(signed);
    results.push({
      name: fx.name,
      ok,
      detail: ok ? undefined : 'verification failed'
    });
  }

  return results;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const results = await runHarness();
  const ok = results.every((r) => r.ok);
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ ok, results }, null, 2));
  process.exit(ok ? 0 : 1);
}
