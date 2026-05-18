# fast.ai — Worked Example Walkthrough

This document shows a complete agent session chain using `edu-agent-skills` with the [fast.ai Practical Deep Learning for Coders](https://course.fast.ai/) repository as the learning context.

**Skills demonstrated:** `repo-understand` → `lesson-plan` → `socratic-mode` (backpropagation) → `challenge-generator`

---

## Session Setup

**Learner background:** Machine learning engineer, familiar with sklearn and feature engineering, minimal neural network background.
**Goal:** "I've been using sklearn for years. I want to understand deep learning from first principles using fast.ai."

---

## Step 1: repo-understand

**Agent runs `repo-understand` on the fast.ai course repo:**

```markdown
## Context
- Repository type: project-first (notebooks + practical lessons, theory woven in)
- Learner goal: understand deep learning from first principles, not just use the API
- Learner level assumption: intermediate ML, beginner DL

## Curriculum Map
- Phase 1: Practical applications (lessons 1–4) → train models, understand outputs
- Phase 2: From scratch (lessons 5–8) → build components manually; understand SGD, backprop
- Phase 3: Foundations (lessons 9–16) → math intuitions, custom training loops, production

## Prerequisite Chain
- sklearn user → knows loss functions, train/test split, metrics
- Gaps to fill: neural network architecture → activation functions → gradient computation
  → backpropagation → SGD → mini-batch training

## Recommended Paths
1. **First-principles path** — start at lesson 5 (from scratch), refer back to lessons 1–4
   for context. Best for your stated goal.
   Tradeoff: less immediate gratification; harder first session.
2. **Application-first** — lessons 1–4 → then loop back to 5–8.
   Best for motivation and quick wins before depth.
   Tradeoff: may reinforce "just use the API" mindset before foundations are solid.
3. **Parallel track** — lessons 1 + 5 simultaneously.
   Best for: building intuition and implementation skill together.

## Checkpoint
You said you want first principles. Does Path 1 suit you, or do you want the motivation
of Path 2 first?
```

**Learner:** "Path 1 — I want to understand what's happening, not just call `learn.fit()`."

---

## Step 2: lesson-plan

**Agent generates a lesson plan for the first-principles path:**

```markdown
## Lesson Plan: fast.ai From Scratch (6 sessions)
Goal: Implement and explain a neural network training loop from scratch by session 6.
Learner level: Intermediate ML, Beginner DL.

## Prerequisites Status
| Prerequisite | Status |
|---|---|
| Loss functions | Confirmed |
| Gradient intuition | Partial (knows gradient descent conceptually) |
| Neural network architecture | Gap — add Session 1 |
| Backpropagation | Gap — add Session 2 |
| PyTorch tensors | Gap — add to Session 1 |

## Phase 1: Foundations (Sessions 1–2)
| Session | Topic | Skill | Gate |
|---|---|---|---|
| 1 | NN architecture + PyTorch tensors | teach-concept | Implement a single linear layer manually |
| 2 | Backpropagation — mechanism and intuition | socratic-mode | Traces backprop on a 2-layer net by hand |

## Phase 2: From Scratch (Sessions 3–4)
| Session | Topic | Skill | Gate |
|---|---|---|---|
| 3 | SGD training loop implementation | build-with-me | Training loop runs on MNIST without fastai |
| 4 | Mini-batch training + data loaders | build-with-me | Loss curve shows convergence |

## Phase 3: Validation (Sessions 5–6)
| Session | Topic | Skill | Gate |
|---|---|---|---|
| 5 | Debugging and tuning the loop | debug-teacher | Identifies and fixes a training bug |
| 6 | Project review + deep-dive on one component | project-review + deep-dive | — |

Buffer: Session 7 if any gate is missed.
Re-plan trigger: 2 consecutive gate failures → restructure Phase 2.
```

---

## Step 3: socratic-mode — Backpropagation

**Session 2. Learner has read fast.ai lesson 5.**

**Learner:** "I sort of understand backprop but I can't explain it clearly. Can you help me reason through it?"

**Agent runs `socratic-mode`:**

```markdown
## Context
Target: Backpropagation mechanism
Reasoning goal: Learner should be able to trace gradient flow through a 2-layer network

## Frame
I'll guide you with questions. The goal is for you to reason to the answer — I'll give
hints if you get stuck, but try each question fully before asking for help.

## Guided Questions

Q1: You have a loss value at the output of your network. To update the first layer's
    weights, what information does that layer need to receive?
    [Learner reasons through it]

Q2: If the output layer's gradient with respect to the loss is dL/dy, what rule
    tells us how to compute dL/dx where x is the output of the previous layer?
    [Learner: "Chain rule?"]
    → Yes. Expand that: what exactly does the chain rule say here?

Q3: You compute dL/dW₂ (gradient for layer 2 weights). Does layer 1 need this
    value, or does it need something different? What does layer 1 actually need?

## Hints (released on request)
- Hint 1: Think about what layer 1 controls — its output feeds into layer 2.
- Hint 2: The chain rule says: gradient at layer 1 = gradient at layer 2 output × local gradient.
- Hint 3: "Local gradient" here is the derivative of layer 2's operation with respect to its input.

## Synthesis Check
Explain backpropagation in 4 sentences. Use the terms: loss, chain rule, gradient,
layer, and update.

## Next Step
Implement backpropagation manually in PyTorch (no autograd) for a 2-layer network
on a toy dataset. This is the gate for session 2.
```

**Learner produces a correct synthesis.** Agent confirms session 2 gate passed.

---

## Step 4: challenge-generator — Backprop Application

**After the Socratic session, agent runs `challenge-generator` to reinforce:**

```markdown
## Challenge
Type: Debug
Difficulty: Intermediate
Grounded in: fast.ai lesson 5 (manual backprop)

The following backward pass has a bug. The network trains but loss doesn't decrease
after the first epoch. Find the bug.

def backward(loss, predictions, targets, W1, W2, X, hidden):
    dL_dpred = 2 * (predictions - targets) / len(targets)
    dL_dW2 = hidden.T @ dL_dpred
    dL_dhidden = dL_dpred @ W2.T
    dL_dW1 = X.T @ dL_dhidden  # ← potential issue here
    return dL_dW1, dL_dW2

### Acceptance Criteria
1. Identify which line has the bug and explain why.
2. Explain what effect the bug has on the gradient signal.
3. Provide the corrected line.

Attempt it — I won't give hints for 5 minutes.
```

**Expected learner observation:** The bug is missing the activation function derivative. `dL_dhidden` should be multiplied by `relu_derivative(hidden)` before computing `dL_dW1`.

**Agent evaluation:** Checks that learner identifies missing activation gradient, explains the vanishing/incorrect gradient effect, and provides the correct line.

---

## Session Outcome

- Learner implements manual backprop correctly after the challenge.
- Gate passed: 2-layer network trains on toy data with correct loss decrease.
- Weak area from this session: activation function derivatives — added to `weak-area-tracker`.
- Session 3 begins with `build-with-me` on the full SGD training loop.

---

## Anti-Patterns Demonstrated (What Not To Do)

| Agent Behavior | Why It Fails |
|---|---|
| Explaining backprop with a lecture before the Socratic session | Removes the discovery element; learner never reasons through it themselves |
| Skipping `lesson-plan` and just starting at lesson 1 | No milestone structure; no gates; learner progresses without verification |
| Running `deep-dive` on backprop with a learner who has a surface gap | `deep-dive` requires confirmed surface understanding — use `socratic-mode` first |
| Showing the backprop bug answer immediately | The challenge requires an unaided attempt first — 5-minute no-hint window enforced |
