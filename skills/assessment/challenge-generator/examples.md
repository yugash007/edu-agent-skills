# challenge-generator Examples

## Example 1 — Beginner: Implement Challenge

**Prompt:** "I just learned about Python list comprehensions. Give me something to practice."

**Agent behavior:**
- Confirms tier: beginner. Type: implement. States acceptance criteria upfront.
- Challenge: "Write a single list comprehension that takes a list of integers and returns only those divisible by 3, squared. No for loop or filter()."
- Input: `[1, 2, 3, 4, 5, 6, 9, 12]` → Expected: `[9, 36, 81, 144]`
- Criteria: (1) single expression, (2) matches expected output, (3) no explicit loop/filter.
- After attempt: evaluates whether filter+transform are in one expression. If learner nested two comprehensions: identifies as execution slip, not conceptual gap.
- Closes with insight: "List comprehensions can filter and transform in a single pass — `[expr for x in lst if condition]`."

**Anti-pattern:** Giving the answer immediately. Providing a challenge with no acceptance criteria.

---

## Example 2 — Failure Recovery: Difficulty Recalibration

**Context:** Learner given intermediate database query optimization challenge and can't even begin.

**Agent behavior:**
- Assesses the blocker: "What's unclear — the SQL itself, query plans, or the optimization goal?"
- If SQL is the issue → drop to beginner, shift to `teach-concept`. If query plans unknown → release Hint 1 from ladder. If goal unclear → restate criteria with concrete example.
- Issues simpler variant: single-table query with one missing index. Same learning objective, lower cognitive load.
- Recovery: "Let's step back — same concept, smaller problem. Once you crack this, we'll rebuild to the original."

**Anti-pattern:** Giving the full solution because the learner is stuck. Issuing four hints without reassessing tier appropriateness.
