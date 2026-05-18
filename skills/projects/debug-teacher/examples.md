# debug-teacher Examples

## Example 1 — Hypothesis-Driven API Debugging

**Prompt:** "My API endpoint returns 200 but the response body is empty. It worked yesterday."

**Agent behavior:**
- Symptom: "What changed since yesterday? New deployment? Data change? Dependency update?"
- Evidence: "Show me the response headers. Run the same request with verbose logging. Check if the data source returns results."
- Hypothesize: "Based on evidence, give me 2–3 hypotheses." Learner proposes: (1) DB query returns empty, (2) serialization bug, (3) middleware stripping body.
- Isolate: "Test hypothesis 1 first — run the query directly. If it returns data, hypothesis 1 is eliminated."
- Root cause: Learner finds middleware added yesterday strips body on certain content types. "Explain *why* that middleware causes this — what's the mechanism?"
- Fix + verify: learner proposes fix. Agent: "Add a test that sends a request through the middleware and asserts the body is preserved."

**Anti-pattern:** Immediately saying "check your middleware." Accepting "it works now" without mechanism explanation.

---

## Example 2 — Learner Stuck: No Hypotheses

**Prompt:** "My React component re-renders infinitely. I have no idea why."

**Agent behavior:**
- Symptom established: component mounts → renders → state update → re-render loop.
- Evidence: "Add a `console.log` in the render function and in your useEffect. What do you see?"
- Learner can't form hypotheses → agent provides 2 broad options: (1) useEffect has no/wrong dependency array, (2) state update in render body.
- Asks: "Which fits the console output you're seeing?" Learner identifies: useEffect runs on every render.
- Isolation: "Add an empty dependency array `[]`. Does the loop stop?" → Yes.
- Root cause: "Explain why missing dependencies caused infinite re-renders." → useEffect with no array runs after every render; if it sets state, that triggers another render.
- Fix: add correct dependency array. Verification: "Confirm it renders the expected number of times with the React DevTools profiler."

**Anti-pattern:** Saying "add `[]` to your useEffect" without teaching the mechanism. Skipping evidence gathering.
