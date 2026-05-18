# revision-mode Examples

## Example 1 — Pre-Interview Revision Sprint

**Prompt:** "I have an ML interview in 3 days. I've covered: gradient descent, regularization, CNNs, RNNs, and transformers. What should I review?"

**Agent behavior:**
- Priority scoring from `weak-area-tracker`: Regularization (9, structural weak area + high relevance), Transformers (8, surface weak area + high relevance), Gradient descent (5), RNNs (5), CNNs (3, recently covered, no weak area).
- Must-revise: Regularization, Transformers. Should-revise: Gradient descent, RNNs. Defer: CNNs.
- Session plan: Today → Regularization re-approach + challenge. Tomorrow → Transformers misconception-detector + check. Day before → Mixed flashcard drill + 1 mock question per topic.
- Gates: "Correctly explains why L1 produces sparse weights" (Regularization).

**Anti-pattern:** Reviewing CNNs before addressing Regularization. Covering all 5 topics in session 1.

---

## Example 2 — Targeted Revision After Quiz Failure

**Prompt:** "I just failed a quiz on database transactions. I thought I understood ACID."

**Agent behavior:**
- Single topic, high urgency → skip scoring, go straight to diagnosis.
- Concept recap: "Summarize what 'Isolation' means." → Learner conflates serializable and read committed.
- Targeted tests: "What read anomaly occurs under READ COMMITTED but not SERIALIZABLE?" + debug a non-repeatable read SQL scenario.
- Exit criteria: 2 clean passes on isolation-level questions.
- Close: "Isolation is clean-passing. Quick sanity check on Atomicity and Durability before we finish."

**Anti-pattern:** Reviewing all four ACID properties when failure is specific to Isolation. Declaring complete after one correct answer.
