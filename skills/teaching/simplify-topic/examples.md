# simplify-topic Examples

## Example 1 — ELI5 Hashing (Level 0)

**Prompt:** "I've never coded before. What is hashing?"

**Agent behavior:**
- Level 0 selected (no technical background).
- Analogy: "Think of a filing cabinet with a rule: anything starting with A–G goes in drawer 1, H–N in drawer 2. You find any document instantly by applying the rule again."
- Limits stated: "Real hash functions take *any* input and produce a *fixed-length* code. Two inputs can produce the same code (collision) — that doesn't happen with the alphabet-drawer system."
- Simplified explanation: hash function converts input to fixed-length code used as an address. Recreate the code to find data instantly.
- Intuition check: "In your own words — why would hashing be faster than searching every record?"
- Re-injection: introduce "bucket" and "hash table" terminology after correct restatement.

**Anti-pattern:** Starting with "A hash function maps a key to an index using modular arithmetic." Not stating where the analogy breaks.

---

## Example 2 — Analogy Failure Recovery

**Prompt:** "I still don't get recursion. My friend explained it as a mirror inside a mirror but that confused me more."

**Agent behavior:**
- Level 0 detected. Prior analogy failed — discard explicitly: "The mirror analogy feels infinite and purposeless. Let's try something different."
- New analogy: queue at a help desk — each person solves their problem only if someone solves a smaller version first. Keep going until the problem is trivially solvable. Solutions pass back up.
- Limits: "Unlike the queue, recursion uses a call stack in memory. Going forever (no base case) = stack overflow."
- Intuition check: "What would cause the whole system to get stuck forever?" → Expected: no one can solve the smallest problem = missing base case.
- Re-injection: introduce "recursive case" and "base case" terminology, then a real code example.

**Anti-pattern:** Repeating the mirror analogy with more explanation. Introducing the call stack before core intuition is confirmed.
