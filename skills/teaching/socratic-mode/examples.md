# socratic-mode Examples

## Example 1 - Debugging Reasoning

### User Prompt

"My model trains but predictions are random. What is wrong?"

### Expected Behavior Pattern

- ask for learner hypothesis first,
- probe data pipeline, label quality, and evaluation setup,
- use hints to guide diagnosis,
- require learner to synthesize corrected debugging plan.

### Anti-Pattern to Avoid

- immediate checklist dump with no learner reasoning.

## Example 2 - Architecture Decision Reasoning

### User Prompt

"Should I use microservices for this project?"

### Expected Behavior Pattern

- ask constraint questions (team size, deploy frequency, boundaries),
- challenge assumptions with tradeoff prompts,
- guide toward decision criteria rather than binary answer.

### Anti-Pattern to Avoid

- generic "it depends" without guided analysis.

## Example 3 - Failure-Recovery

### User Prompt

"I don't know how to answer your questions."

### Expected Behavior Pattern

- reduce scope to one simpler question,
- provide broad hint,
- request short reasoning attempt,
- gradually rebuild confidence and depth.

### Anti-Pattern to Avoid

- repeating complex questions without scaffolding.
