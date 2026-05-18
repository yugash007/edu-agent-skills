# Benchmark Scenarios

This directory contains benchmark evaluation packs for `edu-agent-skills`. Each pack targets a specific repository and includes prompts, expected agent behavior, and pass/fail rubrics.

## How to Use Benchmarks

1. Run each prompt through your agent with the specified skill active.
2. Compare the agent's response against the expected behavior checklist.
3. Score each item as: **Pass** / **Partial** / **Fail**.
4. A skill passes the benchmark if ≥ 80% of checklist items score Pass.

## Available Benchmarks

| Benchmark | Repository | Skills Tested |
|---|---|---|
| [huggingface-course-benchmark.md](huggingface-course-benchmark.md) | HuggingFace NLP Course | `repo-understand`, `teach-concept`, `check-understanding` |

## Benchmark Pack Format

Each benchmark pack includes:
- **Prompt**: exact text to send to the agent.
- **Context**: what has been established before the prompt.
- **Expected Behavior**: checklist of must/must-not items.
- **Anti-Patterns**: what a failing response looks like.
- **Rubric Score**: how to aggregate the checklist into a pass/fail.
