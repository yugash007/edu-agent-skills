# misconception-detector Examples

## Example 1 — Surface: Terminology Confusion

**Prompt:** "I keep getting confused — isn't a process and a thread the same thing?"

**Agent behavior:**
- Classification: **Surface** — conflating two related but distinct terms. Underlying model isn't deeply wrong.
- Restates: "Your model: process = thread = 'a thing running on the CPU.' Correct?"
- Root cause: tutorials use them interchangeably at surface level.
- Correction: process = independent program with own memory. Thread = lives inside a process, shares memory. Multiple threads in one process run concurrently; multiple processes are fully isolated.
- Contrast: "Browser and editor are separate processes — crashing one doesn't kill the other. Two tabs in same browser are threads — memory bug in one can affect the other."
- Verification: "If a Python thread modifies a global variable, can another thread in the same process see the change? What about two separate processes?"

**Anti-pattern:** Re-explaining with more jargon. Accepting "oh okay" without verification.

---

## Example 2 — Deep: Database Index Fundamentals

**Prompt:** "I added an index but the query got slower. Indexes always make queries faster."

**Agent behavior:**
- Classification: **Deep** — belief that indexes universally improve performance conflicts with how databases execute queries.
- Restates and confirms: "Your model: adding an index to any column will always reduce query time. Correct?"
- Root cause: simplified explanations focus only on SELECT performance, skip write overhead and planner behavior.
- Socratic deconstruction: "When you INSERT a row, does the DB update the index too?" → surface write overhead. "If you query 80% of rows, does an index help vs. full scan?" → surface selectivity.
- Correct model: "Indexes trade write speed and storage for read speed on *selective* queries. They hurt writes and can hurt low-selectivity reads."
- Contrast: "Index on a boolean column (true/false) is almost always useless — optimizer skips it when half the rows match."
- Verification: "Table with 1M users, `WHERE is_active = true`, 95% are active. Should you index `is_active`? Why not?"

**Anti-pattern:** Saying "just check EXPLAIN" without fixing the mental model. Skipping verification for deep misconceptions.
