# HuggingFace Course — Worked Example Walkthrough

This document shows a complete agent session chain using `edu-agent-skills` with the [HuggingFace NLP Course](https://huggingface.co/learn/nlp-course/) repository as the learning context.

**Skills demonstrated:** `repo-understand` → `find-your-level` → `teach-concept` (tokenizers) → `check-understanding` → `build-with-me` (fine-tuning pipeline)

---

## Session Setup

**Learner background:** Python developer, 2 years experience, no NLP or ML background.
**Goal:** "I want to fine-tune a BERT model for text classification using this repo."

---

## Step 1: repo-understand

**Agent runs `repo-understand`:**

```markdown
## Context
- Repository type: curriculum-first
- Learner goal: fine-tune BERT for text classification
- Learner level assumption: intermediate Python, beginner ML

## Curriculum Map
- Phase 1: NLP Basics (chapters 1–2) → outcome: understand tokenization, pipelines, model inference
- Phase 2: Fine-tuning (chapters 3–4) → outcome: fine-tune a model on a custom dataset
- Phase 3: Advanced Usage (chapters 5–8) → outcome: datasets library, training loops, model hub

## Prerequisite Chain
- Python → Transformers library → Tokenizers → Datasets → Training API → Fine-tuning
- Tooling prerequisites: Python 3.8+, PyTorch or TensorFlow, HuggingFace account

## Recommended Paths
1. **Fastest path to goal** — chapters 1→3→4 (skip chapters 5–8). Best for: your stated goal.
   Tradeoff: skips Datasets library depth; you'll hit its API cold in chapter 4.
2. **Full course** — chapters 1–8 sequentially. Best for: NLP career track.
   Tradeoff: 6–8 weeks; overkill for your current goal.
3. **Concept-first** — read chapters 1–2 only, then return here for implementation.
   Tradeoff: slower start; stronger foundation.

## Checkpoint
Which path do you want to start with, and what's your current confidence with ML training concepts (1–5)?
```

**Learner:** "Path 1. Confidence: 1 — I've never trained a model."

---

## Step 2: find-your-level

**Agent runs `find-your-level` to calibrate before starting chapter 1:**

```markdown
## Level Diagnostic
Domain: NLP / Transformers
Self-reported confidence: 1/5

Tier 1: "Can you explain what a language model does in one sentence?"
Learner: "It predicts the next word in a sequence, right?"
→ Correct. Surface knowledge present.

Tier 2: "What does 'tokenization' do to a sentence before it enters a model?"
Learner: "...splits it into words?"
→ Partial — splits into tokens (subword), not words. Ceiling at Beginner.

## Inferred Level: Beginner
Rationale: Has conceptual intuition for language models but does not know the tokenization mechanism.

## Starting Point
Chapter 1 of the HuggingFace course — specifically the tokenization section.
We'll use the pipeline() API first to build intuition before going into mechanism.
```

---

## Step 3: teach-concept — Tokenizers

**Learner:** "Explain tokenization. I thought models just read text directly."

**Agent runs `teach-concept`:**

```markdown
## Context
Concept: Tokenization
Learner level: Beginner
Assumption: Learner knows models predict text but doesn't know how text is encoded.

## Explanation
Models work with numbers, not text. Tokenization converts a string into a sequence of
integer IDs that the model can process.

Key twist: tokens are not words. They're subword units. "unhappiness" might become
["un", "happi", "ness"] — three tokens. This lets the vocabulary handle unknown words
by composing them from known pieces.

## Example (from the HuggingFace course repo)
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
tokens = tokenizer("Hello, how are you?")
print(tokens)
# {'input_ids': [101, 7592, 1010, 2129, 2024, 2017, 1029, 102], ...}

Notice: 101 and 102 are [CLS] and [SEP] — special tokens BERT requires. "Hello" and
"are" become single tokens; the comma gets its own.

## Checkpoint
If I tokenize "unhappiness" — will it produce 1 token or multiple? Why?
What's the advantage of that behavior over a word-level vocabulary?
```

**Learner answers correctly.** Agent confirms and continues.

---

## Step 4: check-understanding

**After teaching attention masks and padding:**

```markdown
## Questions
1. Conceptual: Why do we need attention masks? What problem do they solve?
2. Practical: You tokenize ["Hello world", "Hi"] together for batch processing.
   The tokenizer pads the shorter sequence to match the longer one.
   Which tokens should the attention mask mark as 0?
3. Diagnostic: A model trained without attention masks (all 1s, including padding)
   produces worse results than expected. What's likely happening?

## Evaluation
Learner answered Q1 and Q2 correctly.
Q3: Learner said "it's learning from noise" — partially correct but imprecise.
Mistake type: partial model (right direction, wrong mechanism).

## Corrective Feedback
Not just "noise" — the model is computing attention scores over padding tokens and
including them in the softmax. This dilutes attention from real tokens and teaches
the model that [PAD] tokens contain information, which they don't.

## Recheck
You have a batch where 30% of tokens are padding. The model's attention is attending
to those. What specific output degradation would you expect to see?
```

---

## Step 5: build-with-me — Fine-tuning Pipeline

**Learner:** "Okay, I want to start building the fine-tuning script for a sentiment classifier."

**Agent runs `build-with-me`:**

```markdown
## Context
Project goal: Fine-tune bert-base-uncased on SST-2 (sentiment classification)
Current milestone: Milestone 1 — Data loading and tokenization pipeline
Constraints: CPU only (development), aim for ≤2h training time on small dataset subset

## Milestones
1. Data loading + tokenization pipeline (this session)
2. Model instantiation + training loop
3. Evaluation and checkpointing
4. Inference script

## Milestone 1 Plan
1. Load the SST-2 dataset using datasets library.
2. Write a tokenize_function and apply it with .map().
3. Verify tokenized output shape and attention masks.

## Implementation Guidance
Try this first before I show you the full version:
- Load: `load_dataset("glue", "sst2")`
- Write a tokenize_function that takes a batch and returns tokenizer output.
- Apply with `dataset.map(tokenize_function, batched=True)`.

What does `batched=True` do, and why would you use it?

## Checkpoint
Once you have the tokenized dataset — print the shape of `input_ids` for the first
training example. What do you expect to see?

## Next Step (Milestone 1 Gate)
Show me: (1) tokenized dataset with correct column names, (2) attention mask for
a padded batch, (3) your explanation of why truncation_max_length matters.
```

---

## Session Outcome

After 3 sessions following this chain:
- Learner successfully trains a BERT classifier with 91% accuracy on SST-2.
- Concepts confirmed via `check-understanding`: tokenization, attention masks, batching, training loop.
- Weak area identified: learning rate scheduling — routed to `teach-concept` for next session.
- `learning-memory` profile saved with checkpoint at milestone 3.

---

## Anti-Patterns Demonstrated (What Not To Do)

| Agent Behavior | Why It Fails |
|---|---|
| Starting at "let's fine-tune BERT" without `repo-understand` | Learner doesn't know what chapters cover what; session becomes a search exercise |
| Accepting "intermediate" self-report without `find-your-level` | Teaching at wrong level — the learner didn't know what tokenization was |
| Explaining tokenization in full before checking the learner's model | Re-explaining something the learner partially knows wastes time and disengages them |
| Writing the entire fine-tuning script for the learner in `build-with-me` | Learner leaves with code they don't understand and cannot modify |
