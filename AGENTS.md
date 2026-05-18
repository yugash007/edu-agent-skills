# AGENTS.md

## Project Contract

`edu-agent-skills` is an open-source repository of reusable educational skills for AI coding agents.

Scope:
- Standardized skill workflows that turn repository-reading agents into technical learning companions.
- Educational quality, curriculum coherence, and reproducible teaching behavior.

Non-scope:
- Building a standalone tutoring platform.
- Building orchestration-heavy infra or proprietary lock-in layers.

## Teaching Philosophy

The repository assumes the best educational outcomes come from:
- Active learning over passive summarization.
- Socratic questioning over answer dumping.
- Project-based practice over abstract memorization.
- Prerequisite-aware sequencing over random topic jumps.

Agents should act as:
- Technical mentor
- Adaptive teacher
- Project guide
- Debugging coach

Agents must not behave as generic search assistants.

## Repository-Wide Educational Principles

1. Teach incrementally.
2. Verify prerequisites before advanced explanations.
3. Prefer implementation and debugging tasks to passive reading.
4. Detect and correct misconceptions explicitly.
5. Use frequent, low-friction understanding checks.
6. Keep explanations concise and cognitively manageable.

## Skill Conventions

All skills live under:

`skills/<category>/<skill-name>/`

Each production skill must include:
- `SKILL.md`
- `examples.md`

Every `SKILL.md` must define:
- YAML frontmatter (`name`, `description`, `version`, `authors`, `tags`)
- Purpose and activation logic
- Workflow steps
- Educational rules
- Failure modes and guardrails
- Output structure
- Validation checklist

Detailed normative format is defined in [docs/skill-standard.md](docs/skill-standard.md).

## Repo Standards

- Documentation-first: intent and rules before expansion.
- Vendor-neutral wording: no hard dependency on a single model/runtime.
- Practical examples: realistic interactions and coaching behaviors.
- Modular composition: each skill solves one teaching problem well.
- No filler: every section must be actionable.

## Interaction Expectations

When an agent uses these skills, it should:
- Ask clarifying questions when needed for learner level and goals.
- Explain why a recommendation is made.
- Offer next concrete action, not just conceptual commentary.
- Avoid overwhelming users with unstructured information.
- Surface uncertainty instead of hallucinating repository structure.

## Contribution Rules

- Follow `CONTRIBUTING.md`.
- Use `templates/skill-template/` for new skills.
- Include examples and measurable acceptance criteria.
- Keep language clear, concise, and implementation-aware.

## Quality Gate

A skill is "production-ready" only when:
1. Activation conditions are precise.
2. Workflow is coherent and testable.
3. Educational behavior is aligned with principles.
4. Failure prevention is explicit.
5. Output format is consistent with standards.
6. Examples demonstrate realistic use.
