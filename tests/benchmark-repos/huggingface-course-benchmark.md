# Benchmark: HuggingFace NLP Course

**Repository:** HuggingFace NLP Course (`huggingface/course`)
**Skills under test:** `repo-understand`, `teach-concept`, `check-understanding`
**Minimum pass threshold:** 80% of checklist items scored Pass

---

## Scenario 1: repo-understand

### Prompt

```
I want to learn NLP from scratch using the HuggingFace course repository.
I know Python and have used NumPy. I've never worked with ML or NLP.
```

### Context

No prior session. Agent has access to the HuggingFace course repo structure.

### Expected Behavior

**must:**
- [ ] Classifies the repository type (curriculum-first, project-first, or hybrid) with brief evidence.
- [ ] Produces a phase/chapter map with learning outcomes per phase.
- [ ] Identifies prerequisite chain explicitly: Python → NumPy → PyTorch/TF basics → Transformers library → fine-tuning.
- [ ] Provides at least 2 learning path variants (e.g., full course vs. fastest-path-to-goal).
- [ ] Each path includes an explicit tradeoff.
- [ ] Asks a checkpoint question before beginning deep instruction (e.g., "Which path do you want to take?").
- [ ] Notes tooling prerequisites (Python version, library installs).

**must_not:**
- [ ] Dump a raw directory listing or chapter list without structure.
- [ ] State learning outcomes without tying them to specific chapters/phases.
- [ ] Begin teaching a specific concept without the learner selecting a path.
- [ ] Hallucinate course content not present in the repository (label inferred content as tentative).

### Anti-Pattern Example (Failing Response)

> "The HuggingFace course has 12 chapters. Chapter 1 covers pipelines, chapter 2 covers tokenizers..."

This is a raw chapter list — no phase outcomes, no path variants, no checkpoint question.

### Rubric

| Category | Items | Weight |
|---|---|---|
| Repository classification | 1 item | 10% |
| Curriculum map with outcomes | 2 items | 20% |
| Prerequisite chain | 1 item | 15% |
| Multiple paths with tradeoffs | 2 items | 20% |
| Checkpoint question | 1 item | 15% |
| must_not violations (subtract) | 4 items | -10% each |

**Pass:** ≥ 80% of must items checked, 0 must_not violations.

---

## Scenario 2: teach-concept (Tokenizers)

### Prompt

```
Explain what tokenization is. I thought models just read text directly.
```

### Context

Prior session: `repo-understand` has run. Learner level confirmed as Beginner. Learner is in Phase 1 (chapter 2) of the HuggingFace course.

### Expected Behavior

**must:**
- [ ] States learner level assumption explicitly before explaining.
- [ ] Gives a short definition and one core intuition (models work with numbers, not text).
- [ ] Explains subword tokenization (not just word-level) with a concrete example.
- [ ] Shows or describes actual tokenizer output (input_ids, attention_mask, or equivalent).
- [ ] References the HuggingFace course or `AutoTokenizer` as the practical entry point.
- [ ] Includes an active-recall checkpoint question before advancing.
- [ ] Ends with a small implementation or observation task (e.g., "tokenize this sentence and inspect the output").

**must_not:**
- [ ] Explain subword tokenization with pure math or formal definitions without an example first.
- [ ] Skip the understanding checkpoint and continue to the next topic.
- [ ] Treat tokenization as trivial ("it just splits text") without mentioning subword behavior and special tokens.

### Anti-Pattern Example (Failing Response)

> "Tokenization converts text to tokens. Here's how: from transformers import AutoTokenizer; tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased'); tokens = tokenizer('Hello world'); print(tokens). Now let's move on to attention."

Code provided, but: no level assumption stated, no intuition built before code, no checkpoint, moved on immediately.

### Rubric

| Category | Items | Weight |
|---|---|---|
| Level assumption stated | 1 item | 10% |
| Definition + intuition | 2 items | 20% |
| Subword explanation + example | 2 items | 20% |
| Practical anchor (course/library) | 1 item | 10% |
| Active-recall checkpoint | 1 item | 15% |
| Implementation/observation task | 1 item | 15% |
| must_not violations (subtract) | 3 items | -10% each |

**Pass:** ≥ 80% of must items checked, 0 must_not violations.

---

## Scenario 3: check-understanding (Attention Masks)

### Prompt

```
Test whether I really understand attention masks.
```

### Context

Prior session: `teach-concept` covered attention masks. Learner answered correctly on the first checkpoint. Agent is now running `check-understanding` to verify before advancing to model inference.

### Expected Behavior

**must:**
- [ ] States which concepts are being assessed (attention masks, padding behavior).
- [ ] Includes at least one conceptual reasoning question (not definition recall).
- [ ] Includes at least one practical application question (e.g., a batched tokenization scenario).
- [ ] Includes at least one diagnostic question (what goes wrong if masks are ignored).
- [ ] Evaluates the learner's response based on reasoning quality, not keyword match.
- [ ] Classifies any mistake by type: misconception / partial model / execution gap.
- [ ] Provides corrective feedback explaining root cause if any answer fails.
- [ ] Includes a recheck question after any correction.

**must_not:**
- [ ] Ask only factual recall questions ("What values does an attention mask contain?").
- [ ] Score responses as simply right/wrong without diagnosis.
- [ ] End the assessment without a recheck if an error was detected.

### Anti-Pattern Example (Failing Response)

> "Q1: What is an attention mask?
>  Q2: What values can an attention mask contain?
>  Q3: What is padding?
>  How did you do?"

Three definition/recall questions, no reasoning required, no diagnosis, no recheck.

### Rubric

| Category | Items | Weight |
|---|---|---|
| Concepts under assessment stated | 1 item | 10% |
| Conceptual reasoning question | 1 item | 15% |
| Practical application question | 1 item | 15% |
| Diagnostic question | 1 item | 15% |
| Reasoning-quality evaluation | 1 item | 15% |
| Mistake type classification | 1 item | 10% |
| Recheck after correction | 1 item | 10% |
| must_not violations (subtract) | 3 items | -10% each |

**Pass:** ≥ 80% of must items checked, 0 must_not violations.
