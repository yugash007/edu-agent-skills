# weak-area-tracker Examples

## Example 1 — Tracker-Driven Session Plan

**Context:** Session 5 begins. 3 active weak areas:
- Backpropagation direction (structural, recurrence 3, score 5)
- Batch norm purpose (surface, recurrence 2, score 2)
- Activation functions (structural, recurrence 1, score 2, unseen 4 sessions → +1 staleness = 3)

**Agent behavior:**
- Triage: backprop (score 5, 2 failed teach-concept attempts → switch to `socratic-mode`), activation functions (score 3, staleness triggered → `teach-concept`), batch norm deferred (score 2, adding a third topic risks overload).
- Recommendation: "This session: backprop via guided questioning (you've seen explanations, let's reason through it). Then a quick revisit of activation functions since we haven't touched it in 4 sessions."
- Batch norm: "We'll leave this for next session — lower severity, and three topics risks overload."

**Anti-pattern:** Addressing all 3 in one session. Using `teach-concept` for backprop a third time after two failures.

---

## Example 2 — Confirmed Improvement and Resolution

**Context:** Session 7. Backprop tracked for 4 sessions (score 5). Session 6: learner articulated correct mechanism via `socratic-mode`. Session 7: clean pass on `challenge-generator` debug challenge.

**Agent behavior:**
- Resolution gate: Session 6 clean pass (1), Session 7 clean pass (2) → promote to "resolving."
- Output: "Backpropagation: 2 consecutive passes confirmed → promoted to 'resolving.' One more clean pass next session → fully resolved."
- Updated active list: activation functions (score 3), batch norm (score 2). Backprop removed.
- If regression in session 8: "Backprop re-opened with recurrence=4. Need a different angle."

**Anti-pattern:** Marking "resolved" after one clean pass. Not reopening when regression is detected.
