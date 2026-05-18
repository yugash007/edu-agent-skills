# Skill Promotion Criteria

This document defines the requirements a skill must meet to be promoted from `status: draft` to `status: stable`. It is the enforcement mechanism for the quality gate described in `AGENTS.md`.

---

## Overview

A skill exists in one of three statuses:

| Status | Meaning |
|---|---|
| `draft` | Structural scaffold exists; content incomplete or generic. Not suitable for agent use. |
| `stable` | All required sections are complete, specific, and tested. Suitable for agent use. |
| `deprecated` | Superseded by another skill or no longer maintained. Migration target must be specified. |

Promotion from `draft` → `stable` requires passing all 6 gates below.

---

## Promotion Gate Checklist

A skill may be promoted to `stable` only when **all** items in all 6 gates are satisfied.

### Gate 1: Metadata Completeness

- [ ] `name` is in kebab-case and unique within the repository.
- [ ] `description` is trigger-oriented ("Use when...") and ≤ 1 sentence.
- [ ] `version` follows semantic versioning and is ≥ 1.0.0 for stable.
- [ ] `authors` is a non-empty array.
- [ ] `tags` includes at least 2 relevant tags.
- [ ] `status` is set to `stable` only after all other gates pass.

---

### Gate 2: Activation Logic Specificity

- [ ] `Activate When` contains **specific, observable conditions** — not "learner request matches this skill objective."
- [ ] `Do Not Activate When` contains explicit exclusion conditions.
- [ ] `Priority Rules` specifies at least one relationship with another skill (when to defer, what to run first).
- [ ] Activation conditions are distinguishable from at least one adjacent skill in the same category.

**Failure signal:** If activation conditions could apply equally to a different skill in the same category, they are not specific enough.

---

### Gate 3: Workflow Coherence

- [ ] Workflow uses numbered steps.
- [ ] Each step has a clear action and a clear output or transition criterion.
- [ ] At least one step explicitly requires learner input before the agent proceeds.
- [ ] At least one adaptive branch is specified (what changes based on learner response or level).
- [ ] Workflow is not a restatement of the template default: "Orient → Apply → Check → Adapt → Advance."

**Failure signal:** Every step in the workflow is agent-driven with no learner participation gates.

---

### Gate 4: Educational Rules Enforceability

- [ ] Educational rules are skill-specific, not generic (e.g., not just "teach incrementally").
- [ ] Each rule is observable from conversation output — it can be used as a rubric.
- [ ] At least one rule is unique to this skill and would not appear word-for-word in a different skill.
- [ ] Rules explicitly address the most common misuse of this skill type.

**Failure signal:** Educational rules are identical to those in the skill template or another skill.

---

### Gate 5: Failure Modes Completeness

- [ ] At least 4 failure modes are defined.
- [ ] Each failure mode has: symptom, likely cause, and corrective action.
- [ ] At least one failure mode is skill-specific (not generic like "information overload" applied without context).
- [ ] Failure modes are testable: a reviewer can read a conversation transcript and identify whether the mode occurred.

**Failure signal:** Failure modes are listed as one-line bullets without symptoms or corrective actions.

---

### Gate 6: Examples Quality

- [ ] `examples.md` contains at least 3 examples.
- [ ] One example demonstrates a beginner learner.
- [ ] One example demonstrates an intermediate or advanced learner.
- [ ] One example demonstrates a failure-recovery scenario (learner stuck, session goes wrong, recovery applied).
- [ ] Each example includes: user prompt, expected agent behavior pattern, and anti-pattern to avoid.
- [ ] Examples are realistic — they reference specific domains, concepts, or code, not generic placeholders.

**Failure signal:** Examples contain placeholder text or describe behavior at an abstract level without any concrete agent response.

---

## Promotion Process

1. **Self-review:** Skill author completes all 6 gate checklists.
2. **Peer review:** One other contributor reviews the skill against the same 6 gates.
3. **Update status:** Only after both reviews pass, update `status: stable` in frontmatter.
4. **Version bump:** Set version to `1.0.0` if this is the first stable release.
5. **Announce:** Update `ROADMAP.md` to reflect the newly promoted skill.

---

## Demotion (Stable → Draft)

A skill may be demoted from `stable` to `draft` if:
- A significant behavior change in the target agent runtime breaks the skill's workflow.
- The skill's activation conditions now conflict with a newly added skill.
- More than 2 of the 6 gates fail on re-review.

Demotion must include: a comment in the frontmatter explaining the reason, and a target date for re-promotion.

---

## Deprecation (Stable → Deprecated)

A skill is deprecated when:
- Its function is fully superseded by a new skill.
- Its failure modes are persistent and unresolvable within its current design.

Deprecation requirements:
- Set `status: deprecated` in frontmatter.
- Add a `deprecated_in` field with the version.
- Add a `migration_target` field pointing to the replacement skill.
- Retain the last stable `SKILL.md` for compatibility reference — do not delete.

---

## Versioning After Promotion

| Change Type | Version Bump | Examples |
|---|---|---|
| Wording clarity, no behavior change | Patch (1.0.x) | Fixing a typo, clarifying a guardrail sentence |
| Additive workflow improvement | Minor (1.x.0) | Adding a new step, adding a failure mode |
| Breaking workflow or output change | Major (x.0.0) | Changing the output structure, removing a required step |
