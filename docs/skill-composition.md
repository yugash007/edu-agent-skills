# Skill Composition Guide

How to combine skills in `edu-agent-skills` for coherent, non-conflicting teaching sessions. This guide covers common skill chains, conflict resolution rules, and a decision tree for overlapping skills.

---

## Core Principle

Skills are designed to compose, not conflict. Each skill solves one educational problem. The agent's job is to select the right skill for the current moment and hand off cleanly to the next.

**Rule:** Only one skill should be "active" at a time. Switching skills mid-execution requires an explicit handoff signal.

---

## Standard Skill Chains

### Chain 1: New Learner, New Repository

```
repo-understand → find-your-level → lesson-plan → teach-concept → check-understanding
```

**When:** Learner wants to learn from a repo they haven't studied before.

**Steps:**
1. `repo-understand`: map curriculum, prerequisites, learning paths.
2. `find-your-level`: calibrate learner level to select appropriate path.
3. `lesson-plan`: structure the path into sessions with gates.
4. `teach-concept`: deliver the first session concept.
5. `check-understanding`: verify before advancing.

**Handoff signals:**
- `repo-understand` → `find-your-level`: curriculum map is complete; learner confirms which goal path they want.
- `find-your-level` → `lesson-plan`: level is confirmed and goal is specific.
- `lesson-plan` → `teach-concept`: plan is approved; first session begins.
- `teach-concept` → `check-understanding`: concept explanation is complete.

---

### Chain 2: Concept Deepening

```
teach-concept → check-understanding → deep-dive
```
OR (if understanding fails):
```
teach-concept → check-understanding → socratic-mode → check-understanding
```
OR (if misconception detected):
```
check-understanding → misconception-detector → challenge-generator
```

**Decision point after `check-understanding`:**
- Passed cleanly + learner wants more depth → `deep-dive`
- Passed but shallowly + agent wants to verify reasoning → `socratic-mode`
- Failed with a specific error pattern → `misconception-detector`
- Failed — needs simplification → `simplify-topic` then `teach-concept` retry

---

### Chain 3: Project Implementation

```
build-with-me → architecture-review (design phase)
             → debug-teacher (when stuck on bug)
             → project-review (milestone completion)
```

**When:** Learner is building a project across multiple sessions.

**Handoff rules:**
- If the learner proposes a design during `build-with-me`: pause `build-with-me`, run `architecture-review`, then return.
- If the learner hits a bug they cannot diagnose: pause `build-with-me`, run `debug-teacher`, then return.
- If a concept gap is found mid-build: pause `build-with-me`, run `teach-concept`, then return.

**Do not mix:** Never run `architecture-review` and `build-with-me` simultaneously — complete the architecture review first, then continue implementation.

---

### Chain 4: Interview Preparation Track

```
find-your-level → lesson-plan (interview-focused)
               → teach-concept / deep-dive (topic coverage)
               → challenge-generator (application practice)
               → interview-mode (simulation)
               → misconception-detector (post-debrief remediation)
```

**Pacing:** 3–4 sessions of content and practice per session of `interview-mode`.

---

### Chain 5: Long-Term Retention Track

```
(After any teaching session)
flashcards (generate) → spaced-repetition (schedule)
                      → revision-mode (pre-deadline sprint)
                      → weak-area-tracker (priority triage)
```

**Session start protocol for sustained tracks:**
1. Check `spaced-repetition` for due items.
2. Check `weak-area-tracker` for priority weak areas.
3. Run due items + address top weak area.
4. Then continue new content.

---

## Conflict Resolution

### `teach-concept` vs `socratic-mode` vs `deep-dive`

| Condition | Use |
|---|---|
| Learner has no prior exposure to concept | `teach-concept` |
| Prior explanation failed or understanding is shallow | `socratic-mode` |
| Learner has surface understanding and wants depth | `deep-dive` |
| Learner's confusion is from a misconception (not depth gap) | `misconception-detector` first, then appropriate teaching skill |

**Rule:** `deep-dive` requires confirmed surface understanding. Never run `deep-dive` on a blank slate — `teach-concept` first.

---

### `check-understanding` vs `misconception-detector` vs `interview-mode`

| Condition | Use |
|---|---|
| Verifying understanding after a teaching session | `check-understanding` |
| Repeated error on the same concept across multiple sessions | `misconception-detector` |
| Building confidence and communication for an interview | `interview-mode` |
| Detecting what type of error is occurring | `misconception-detector` (classifies error type) |

**Rule:** `check-understanding` is reactive (after teaching). `misconception-detector` is diagnostic (when a pattern is detected). `interview-mode` is simulation (pressure practice).

---

### `repo-understand` vs `lesson-plan` vs `find-your-level`

| Condition | Use |
|---|---|
| Repository structure is unknown | `repo-understand` |
| Learner level is unknown | `find-your-level` |
| Multi-session plan is needed | `lesson-plan` |

**Sequencing rule:** `repo-understand` → `find-your-level` → `lesson-plan`. Never build a lesson plan without knowing both the curriculum structure and the learner's level.

---

### `build-with-me` vs `debug-teacher` vs `architecture-review`

| Condition | Use |
|---|---|
| Guiding overall project implementation | `build-with-me` |
| Learner is stuck on a specific bug | `debug-teacher` (pause `build-with-me`) |
| Learner proposes a design for critique | `architecture-review` (pause `build-with-me`) |
| Project is complete and needs evaluation | `project-review` |

**Rule:** `debug-teacher` and `architecture-review` are invoked from within `build-with-me` and return to it. They are not standalone replacements for `build-with-me`.

---

## Precedence Table

When two skills could activate simultaneously, use this precedence:

| Higher Priority | Lower Priority | Condition |
|---|---|---|
| `misconception-detector` | `check-understanding` | Repeated error pattern detected |
| `teach-concept` | `deep-dive` | Concept not yet introduced |
| `simplify-topic` | `teach-concept` | Prior explanation failed (abstraction mismatch) |
| `repo-understand` | Any teaching skill | Repo context unmapped |
| `find-your-level` | `lesson-plan` | Level unknown |
| `debug-teacher` | `build-with-me` | Learner is actively stuck on a bug |
| `spaced-repetition` (due items) | New content | Items are overdue at session start |

---

## Skill Handoff Protocol

When switching between skills:

1. **Signal the switch explicitly**: "I'm going to pause [current skill] and run [new skill] because [reason]."
2. **State the return point**: "After this, we'll return to [current skill] at [checkpoint]."
3. **Carry context forward**: The new skill should receive relevant state from the prior skill (learner level, weak areas, current topic).
4. **Close cleanly**: Each skill should end with a summary of what was established before switching.

---

## Composition Anti-Patterns

❌ **Skill blending**: Running `teach-concept` while in `interview-mode` (breaks simulation framing).
❌ **Skipping gates**: Advancing to `deep-dive` without confirming surface understanding.
❌ **Recursive escalation**: `misconception-detector` → `socratic-mode` → `misconception-detector` without a `check-understanding` verification step in between.
❌ **lesson-plan without level**: Building a session plan before `find-your-level` produces learner calibration.
❌ **spaced-repetition for unknown concepts**: Scheduling review for a concept the learner doesn't understand yet.
