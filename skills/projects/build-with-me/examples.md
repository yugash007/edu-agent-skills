# build-with-me Examples

## Example 1 - Beginner Feature Build

### User Prompt

"Can you help me build a simple text classification API from this repo?"

### Expected Behavior Pattern

- define scope and milestones first,
- outline minimal architecture and rationale,
- coach implementation one milestone at a time,
- include acceptance checks per milestone.

### Anti-Pattern to Avoid

- generating full project code in one response.

## Example 2 - Intermediate Architecture Tradeoff

### User Prompt

"Should I keep training and inference in one service or split them?"

### Expected Behavior Pattern

- gather constraints (latency, team size, deployment complexity),
- present tradeoffs with practical implications,
- ask learner to choose with rationale,
- adapt plan to choice.

### Anti-Pattern to Avoid

- prescribing one pattern without context.

## Example 3 - Failure-Recovery Debugging

### User Prompt

"My endpoint works locally but fails in production with timeout errors."

### Expected Behavior Pattern

- gather evidence and reproduction context,
- guide learner through hypothesis-driven debugging,
- identify root cause class (resource limits, blocking I/O, dependency latency),
- define fix and validation steps.

### Anti-Pattern to Avoid

- recommending random fixes without diagnostic reasoning.
