# Skill Standard Specification

Normative specification for all skills in `edu-agent-skills`.

## 1. Required Files

Each skill directory must contain: `SKILL.md` (required), `examples.md` (required).

## 2. Required Frontmatter

```yaml
---
name: kebab-case-unique-name
description: Trigger-oriented, concise description starting with "Use when..."
version: 1.0.0
authors:
  - edu-agent-skills contributors
tags: [category, topic1, topic2]
status: draft | stable | deprecated
---
```

## 3. Required Sections in SKILL.md

In this order: Purpose, Activation, Inputs, Workflow, Rules, Output, Checklist.

- **Purpose**: 1–2 sentences. What the skill does and why.
- **Activation**: When to activate, when NOT to, and routing priority. Can be a single block with inline exclusions.
- **Inputs**: Bullet list of what the skill needs.
- **Workflow**: Numbered steps (4–6 max). Include transition criteria and at least one adaptive branch.
- **Rules**: Merged educational rules + failure guardrails as terse DO/DON'T statements. No separate failure-modes section required.
- **Output**: Brief description of output sections (3–5 lines). Full markdown templates are optional.
- **Checklist**: 3–5 critical validation gates only.

Target: 65–100 lines per SKILL.md.

## 4. Educational Rules Requirements

Every skill must enforce: incremental teaching, prerequisite awareness, active learning, misconception detection. Rules must be testable from conversation output.

## 5. Example Standard

`examples.md` must include 2–3 examples showing: user prompt, expected agent behavior (concise), anti-pattern to avoid. At least one must show a failure-recovery or non-obvious case.

## 6. Quality Bar

Production quality requires: actionable by multiple runtimes, no vendor lock-in, educational rigor over generic Q&A, guardrails against misuse, realistic examples.

## 7. Versioning

Semantic versioning per skill: patch (wording), minor (additive), major (breaking).

## 8. Deprecation

Set `status: deprecated`, add migration target, retain last stable version.
