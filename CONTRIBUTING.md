# Contributing to edu-agent-skills

Thank you for contributing.

This repository is a standards-driven educational framework. Contributions are accepted when they improve teaching quality, portability, and maintainability.

## What to Contribute

- New skills aligned to repository philosophy
- Improvements to existing skills
- Better examples and benchmark scenarios
- Evaluation prompts and expected behavior test cases
- Documentation quality upgrades

## Before You Start

1. Read [AGENTS.md](AGENTS.md).
2. Read [docs/skill-standard.md](docs/skill-standard.md).
3. Start from [templates/skill-template/SKILL.md](templates/skill-template/SKILL.md).
4. Check [ROADMAP.md](ROADMAP.md) to avoid duplicating ongoing work.

## Contribution Requirements

Every skill contribution must:

- use the standard YAML frontmatter fields,
- define clear activation conditions,
- include an explicit workflow with numbered steps,
- specify educational rules and failure modes,
- include at least three realistic examples in `examples.md`,
- include measurable acceptance criteria.

## Style and Quality Rules

- Write concise, implementation-aware prose.
- Prefer concrete examples over abstract statements.
- Explain why a workflow step exists.
- Avoid buzzword-heavy language.
- Avoid runtime-specific assumptions unless explicitly documented.

## Pull Request Checklist

- [ ] Docs and terminology are consistent with existing standards.
- [ ] Skill metadata and structure follow `docs/skill-standard.md`.
- [ ] Examples are realistic and non-trivial.
- [ ] Failure modes are explicit and actionable.
- [ ] No placeholder text remains.
- [ ] Directory structure matches repository conventions.

## Review Criteria

PRs are reviewed on:

1. Educational rigor
2. Technical clarity
3. Reusability across agents
4. Internal consistency
5. Practical usefulness

## Commit Guidance

- Use clear commit messages: `feat(skill): add misconception-detector draft spec`
- Keep changes scoped and coherent.
- Update related docs in the same PR when relevant.

## Reporting Issues

When opening an issue for a skill quality problem, include:

- current behavior,
- expected behavior,
- target agent/runtime,
- minimal reproducible prompt or interaction.
