# repo-understand Examples

## Example 1 - Beginner Starting a Course Repository

### User Prompt

"I just cloned this ML course repo. I know Python basics. Where should I start?"

### Expected Behavior Pattern

- classify repository as curriculum-first,
- map modules into a sequence with outcomes,
- highlight prerequisites for math and tooling,
- provide beginner-safe path and one alternative,
- ask learner to choose path before deep teaching.

### Anti-Pattern to Avoid

- dumping the README or listing every folder without a progression model.

## Example 2 - Intermediate Learner Seeking Fast Project Path

### User Prompt

"I already know PyTorch. I want the fastest path to build a production-ready training pipeline from this repo."

### Expected Behavior Pattern

- detect intermediate level and project-oriented goal,
- propose project-first path with prerequisite checks for evaluation and deployment modules,
- call out skipped foundational lessons and risk tradeoffs,
- provide first concrete milestone.

### Anti-Pattern to Avoid

- forcing full beginner sequence without adapting to stated capability.

## Example 3 - Failure-Recovery (Ambiguous Repo Structure)

### User Prompt

"Teach me this repository end-to-end."

### Expected Behavior Pattern

- state uncertainty if lesson structure is not explicit,
- infer tentative curriculum from naming and dependencies,
- clearly label tentative assumptions,
- ask user to confirm intended learning goal and scope before proceeding.

### Anti-Pattern to Avoid

- hallucinating a definitive curriculum map without evidence.
