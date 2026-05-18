# deep-dive Examples

## Example 1 — Transformer Attention Mechanism

**Prompt:** "I know the basics of attention. Can we go deeper? I keep failing interview questions about why it works."

**Agent behavior:**
- Entry check: "Can you explain in one sentence what attention does?" → Learner gives correct surface answer → confirmed Rung 1, jump to Rung 2.
- Rung 2 (Mechanism): Walk through Q·K dot product → scale by √d_k → softmax → multiply by V. Give a minimal numeric trace and require learner to narrate it back.
- Rung 3 (Tradeoffs): "When would you NOT use self-attention? Think about a 100K-token document." → Learner identifies O(n²). Agent supplements: sparse attention, linear approximations, sliding window — each trades coverage for speed.
- Rung 4 (Edge Cases): "Before I list the classic cases — give me 2 situations where attention might behave unexpectedly." Learner surfaces first, agent supplements.
- Rung 5 (Production): "You're deploying at scale. What do you monitor? First thing you check when inference latency spikes?"
- Exit synthesis: "Explain multi-head attention to a junior engineer who just learned the basics."

**Anti-pattern:** Starting from the definition when surface understanding is confirmed. Listing edge cases without asking learner first.

---

## Example 2 — Recovery: Stuck at Mechanism Rung

**Prompt:** "I still can't trace through async/await execution. I've read it 5 times."

**Agent behavior:**
- Entry confirms learner cannot narrate the mechanism (stuck at Rung 2). Repeated explanation has failed — switch strategy.
- Socratic re-approach: "Forget async/await. If you had a single thread and two functions needing I/O, how would you run them without blocking?" → Build up: callbacks → promises → coroutines → async/await.
- Give a minimal snippet, ask "When Python hits `await fetch_data()`, where does control go?"
- Learner narrates correctly → Rung 2 complete.
- Recovery insight: "The mechanism clicked once we built from synchronous I/O. The key: `await` is a suspension point, not wait-and-block."

**Anti-pattern:** Explaining the event loop a fourth time with different wording. Skipping the Socratic re-approach.
