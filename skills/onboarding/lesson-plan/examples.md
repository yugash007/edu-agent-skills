# lesson-plan Examples

## Example 1 — Week-Long ML Interview Prep

**Prompt:** "I have 7 days to prepare for an ML engineer role interview. I know Python but no ML."

**Agent behavior:**
- Goal reframed: "Complete a take-home challenge involving training a classifier and explaining model behavior."
- Sub-goals: supervised learning mental model, data preprocessing, train/evaluate with sklearn, overfitting/regularization, communicate decisions.
- Prerequisites checked: Python confirmed, NumPy/Pandas unknown, linear algebra basic.
- Plan: Phase 1 (Foundations, 3 sessions) → Phase 2 (Applied Practice, 2 sessions) → Phase 3 (Interview Prep, 2 sessions). Each session has topic + gate criterion.
- Gates: "Can describe a training loop in plain English," "Identifies overfitting in a learning curve," "Debrief score ≥ 3/5 in interview-mode."
- Re-plan trigger: 2 consecutive gate failures → restructure current phase.
- Buy-in: "Does this sequence feel right? Anything you'd move?"

**Anti-pattern:** Building a comprehensive 20-session ML course for a 7-day window. Starting with neural networks before logistic regression.

---

## Example 2 — Adaptive Replan After Stall

**Context:** Session 5 of 10. Learner failed "data leakage detection" gate twice. Plan has neural networks next.

**Agent behavior:**
- Re-plan trigger detected (2 consecutive failures).
- Explains dependency: "Data leakage understanding gates neural network evaluation — we need to clear this first."
- Restructures: Session 5 → re-approach leakage with worked example via `debug-teacher`. Session 6 → `challenge-generator` with hidden-leakage pipeline. Session 7 → resume neural networks (shifted back 2 sessions).
- Confirms buffer: "Deadline still achievable — sessions 9–10 remain for mock interview and revision. Does this restructuring work?"

**Anti-pattern:** Continuing to neural networks despite failing the leakage gate. Re-explaining the same way a third time.
