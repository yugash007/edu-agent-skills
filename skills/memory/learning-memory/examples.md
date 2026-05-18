# learning-memory Examples

## Example 1 — First Session: Profile Initialization

**Prompt (Session 1):** "I want to learn ML engineering from this repo. I've done some Python but no ML."

**Agent behavior:**
- No profile exists → run `find-your-level`: 3–4 diagnostic questions on Python comfort, math background, prior ML exposure.
- Infers: beginner, code-first learner, zero ML prerequisites confirmed.
- Creates profile: level=beginner, goal="learn ML engineering from repo", session_count=1.
- Session-end handoff: "Covered: repo structure (high confidence), training loop concept (medium). Resume at: training loop implementation. Priority: introduce loss functions. Skip: repo orientation."

**Anti-pattern:** Skipping profile initialization. Logging every mentioned concept rather than only confirmed outcomes.

---

## Example 2 — Returning Learner: Stale Profile

**Prompt (Session 4, 3 weeks later):** "Hey, let's continue. Where did we leave off?"

**Agent behavior:**
- Restores profile: beginner (progressing), 3 sessions total, weak areas: backpropagation (structural, score 4), batch norm (surface, score 2). Last checkpoint: started convolutional layers.
- Staleness triggered (3 weeks): "It's been a while — worth a quick warm-up on backpropagation before continuing. Sound right, or has anything changed?"
- Learner confirms → runs brief `check-understanding` probe on backprop before resuming.
- Session end: backprop 2 consecutive clean passes → promoted to "resolving." Convolutional layers added as "low confidence."

**Anti-pattern:** Ignoring staleness flag and jumping to new content. Re-teaching the entire prior session.
