/**
 * Opt-in startup check for the chat assistant (GEMINI_SELF_TEST_ON_BOOT=true): sends Gemini one tiny request and
 * logs PASS/FAIL with the HTTP status. Never logs the key. Lets a deployment be verified from server logs alone.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.GEMINI_SELF_TEST_ON_BOOT !== "true") return;
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) return console.log("[chat self-test] FAIL: GEMINI_API_KEY is not set");
  const base = process.env.GEMINI_API_BASE || "https://generativelanguage.googleapis.com/v1beta";
  for (const model of [process.env.GEMINI_MODEL, "gemini-3.1-flash-lite", "gemini-flash-latest"].filter(Boolean) as string[]) {
    try {
      const res = await fetch(`${base}/models/${encodeURIComponent(model)}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: "Reply with the single word: ok" }] }], generationConfig: { maxOutputTokens: 5 } }),
        signal: AbortSignal.timeout(20_000),
      });
      if (res.status === 404) {
        console.log(`[chat self-test] model ${model} not available (404), trying next`);
        continue;
      }
      console.log(`[chat self-test] ${res.ok ? "PASS" : "FAIL"}: model ${model} answered HTTP ${res.status}`);
      return;
    } catch (e) {
      console.log(`[chat self-test] FAIL: ${(e as Error).name === "TimeoutError" ? "timed out" : "unreachable"}`);
      return;
    }
  }
  console.log("[chat self-test] FAIL: no configured model is available to this key");
}
