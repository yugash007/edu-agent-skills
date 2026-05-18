# Getting Started with edu-agent-skills

This guide helps you integrate `edu-agent-skills` into your agent runtime in 5 steps.

## Prerequisites

- A repository-reading AI agent (see [supported-agents.md](supported-agents.md) for compatibility details).
- Access to the skill files in `skills/`.
- Basic understanding of how your agent runtime invokes tool or instruction files.

## Step 1: Understand the Teaching Philosophy

Before configuring skills, read [AGENTS.md](../AGENTS.md). The key commitments:
- Active learning over passive summarization.
- Socratic questioning before answer dumping.
- Prerequisite-aware sequencing.

Skills will not work well if the agent is configured to prioritize speed over educational rigor.

## Step 2: Learn the Skill Architecture

All skills live under `skills/<category>/<skill-name>/`. There are 6 categories:

| Category | Purpose | Key Skills |
|---|---|---|
| `onboarding/` | Orient learner before teaching | `repo-understand`, `find-your-level`, `lesson-plan` |
| `teaching/` | Concept explanation | `teach-concept`, `socratic-mode`, `deep-dive`, `simplify-topic` |
| `assessment/` | Understanding verification | `check-understanding`, `challenge-generator`, `interview-mode`, `misconception-detector` |
| `projects/` | Implementation coaching | `build-with-me`, `architecture-review`, `debug-teacher`, `project-review` |
| `memory/` | Cross-session continuity | `learning-memory`, `weak-area-tracker` |
| `productivity/` | Retention and revision | `flashcards`, `revision-mode`, `spaced-repetition` |

See [skills/INDEX.md](../skills/INDEX.md) for the full skill reference with one-line descriptions and composition notes.

## Step 3: Choose Your Starting Skills

For a first integration, start with the 5 core skills:

1. `repo-understand` — always run first for repository-based learning.
2. `teach-concept` — the primary teaching vehicle.
3. `check-understanding` — pair with every `teach-concept` session.
4. `socratic-mode` — escalation path when direct teaching isn't working.
5. `build-with-me` — for project-based learning contexts.

These 5 cover the majority of learning scenarios.

## Step 4: Understand Skill Composition

Skills compose into chains. The most common chains are:

**New learner, new repository:**
```
repo-understand → find-your-level → lesson-plan → teach-concept → check-understanding
```

**Concept deepening:**
```
teach-concept → check-understanding → deep-dive
```
or (if understanding is shallow):
```
teach-concept → check-understanding → socratic-mode → check-understanding
```

**Project implementation:**
```
build-with-me ↔ architecture-review (design phase)
             ↔ debug-teacher (bug phase)
             → project-review (completion)
```

For a complete decision tree covering all skills and conflict resolution rules, see [docs/skill-composition.md](skill-composition.md).

## Step 5: Validate Behavior

Use the test infrastructure to verify your integration behaves correctly:

1. **Evaluation prompts** — `tests/evaluation-prompts/core-skills.md` contains sample prompts for each core skill.
2. **Expected behaviors** — `tests/expected-behaviors/core-skills.yaml` defines `must` and `must_not` behaviors per skill.
3. **Benchmark scenarios** — `tests/benchmark-repos/` contains full prompt → expected behavior → rubric packs against real repositories.

A passing integration means:
- All `must` behaviors are observable in the agent's responses.
- No `must_not` behaviors appear.
- Benchmark rubric scores ≥ 80%.

## What to Read Next

- [skill-standard.md](skill-standard.md) — normative spec for every skill.
- [skill-composition.md](skill-composition.md) — decision tree for combining skills.
- [promotion-criteria.md](promotion-criteria.md) — how skills graduate from draft to stable.
- [../CONTRIBUTING.md](../CONTRIBUTING.md) — how to contribute new skills.
- [../skills/INDEX.md](../skills/INDEX.md) — full skill catalog with descriptions.

## Common Mistakes to Avoid

| Mistake | Correct Behavior |
|---|---|
| Running `teach-concept` without `repo-understand` when repo context exists | Always run `repo-understand` first for repo-based learning |
| Using `deep-dive` as the first skill for a new topic | `deep-dive` requires confirmed surface understanding |
| Skipping `find-your-level` for self-reported "intermediate" learners | Self-reports are unreliable; always run a diagnostic |
| Running `spaced-repetition` for concepts not yet learned | Spaced repetition reviews — it does not teach |
| Switching skills mid-execution without an explicit handoff | Signal the switch, state the return point, carry context forward |
