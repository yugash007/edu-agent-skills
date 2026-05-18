# Skill Index

All 20 skills in `edu-agent-skills`, organized by category with status, version, and recommended composition.

## Quick Reference

| Skill | Category | Status | Version | One-Line Description |
|---|---|---|---|---|
| [repo-understand](#repo-understand) | Onboarding | stable | 1.0.0 | Map curriculum structure and prerequisites before teaching begins |
| [find-your-level](#find-your-level) | Onboarding | stable | 1.0.0 | Diagnose learner level via targeted question battery |
| [lesson-plan](#lesson-plan) | Onboarding | stable | 1.0.0 | Create multi-session learning roadmap with gated milestones |
| [teach-concept](#teach-concept) | Teaching | stable | 1.0.0 | Explain concepts incrementally with active-recall checks |
| [socratic-mode](#socratic-mode) | Teaching | stable | 1.0.0 | Build reasoning through sequenced questions before answers |
| [deep-dive](#deep-dive) | Teaching | stable | 1.0.0 | Take confirmed understanding from surface to production depth |
| [simplify-topic](#simplify-topic) | Teaching | stable | 1.0.0 | Reframe complex concepts with analogy-first teaching |
| [check-understanding](#check-understanding) | Assessment | stable | 1.0.0 | Verify understanding through reasoning-first questions |
| [challenge-generator](#challenge-generator) | Assessment | stable | 1.0.0 | Generate personalized practice challenges targeting weak areas |
| [interview-mode](#interview-mode) | Assessment | stable | 1.0.0 | Simulate technical interviews with structured debrief |
| [misconception-detector](#misconception-detector) | Assessment | stable | 1.0.0 | Classify and correct faulty mental models with targeted correction loops |
| [learning-memory](#learning-memory) | Memory | stable | 1.0.0 | Capture and restore learner profile across sessions |
| [weak-area-tracker](#weak-area-tracker) | Memory | stable | 1.0.0 | Log, score, and triage weak areas to drive intervention selection |
| [flashcards](#flashcards) | Productivity | stable | 1.0.0 | Generate and test active-recall flashcards grounded in session concepts |
| [revision-mode](#revision-mode) | Productivity | stable | 1.0.0 | Run prioritized review sessions weighted by recency and error history |
| [spaced-repetition](#spaced-repetition) | Productivity | stable | 1.0.0 | Schedule reviews at expanding intervals using simplified SM2 algorithm |
| [build-with-me](#build-with-me) | Projects | stable | 1.0.0 | Guide real project implementation while preserving learner ownership |
| [architecture-review](#architecture-review) | Projects | stable | 1.0.0 | Critique system designs through probe-before-prescribe questioning |
| [debug-teacher](#debug-teacher) | Projects | stable | 1.0.0 | Coach hypothesis-driven debugging requiring learner reasoning first |
| [project-review](#project-review) | Projects | stable | 1.0.0 | Structured project evaluation across scope, quality, and learning outcomes |

---

## Onboarding

### repo-understand
**Path:** `skills/onboarding/repo-understand/`
**Purpose:** Create a curriculum map from a repository before any teaching begins.
**When to use:** Any time a learner wants to learn from a repository they haven't navigated educationally before.
**Feeds into:** `find-your-level`, `teach-concept`, `lesson-plan`
**Must precede:** `teach-concept`, `socratic-mode`, `build-with-me` when repo context is absent.

### find-your-level
**Path:** `skills/onboarding/find-your-level/`
**Purpose:** Calibrate the agent's understanding of where the learner actually is, not just where they think they are.
**When to use:** New learner, uncertain self-report, or returning learner after a long gap.
**Feeds into:** `lesson-plan`, `teach-concept`, `learning-memory`
**Must precede:** Any teaching that would be pitched at the wrong level without calibration.

### lesson-plan
**Path:** `skills/onboarding/lesson-plan/`
**Purpose:** Structure multi-session learning with milestones, gates, and re-plan triggers.
**When to use:** Learner has a defined goal and 3+ sessions to spend on it.
**Requires:** `find-your-level` output, `repo-understand` output (if repo-based).
**Feeds into:** All teaching and project skills as the organizing framework.

---

## Teaching

### teach-concept
**Path:** `skills/teaching/teach-concept/`
**Purpose:** Explain a single concept incrementally from definition to application.
**When to use:** Learner is new to a concept or needs a foundational explanation.
**Pair with:** `check-understanding` (after explanation), `socratic-mode` (if understanding remains shallow).

### socratic-mode
**Path:** `skills/teaching/socratic-mode/`
**Purpose:** Guide the learner to the correct answer through sequenced questions.
**When to use:** `teach-concept` has been tried and understanding is still shallow; or learner prefers reasoning-led discovery.
**Escalation:** Trigger when `check-understanding` reveals persistent confusion after direct teaching.

### deep-dive
**Path:** `skills/teaching/deep-dive/`
**Purpose:** Extend confirmed surface knowledge to mechanism, tradeoffs, edge cases, and production depth.
**When to use:** Learner knows basics and needs depth for interviews, architecture decisions, or genuine mastery.
**Requires:** Confirmed surface understanding (from `check-understanding` or prior session).

### simplify-topic
**Path:** `skills/teaching/simplify-topic/`
**Purpose:** Reframe an abstract concept using analogies calibrated to the learner's background domain.
**When to use:** Prior explanation failed, or learner's background is far from the topic domain.
**Must follow with:** Complexity re-injection — never leave the learner at simplified level permanently.

---

## Assessment

### check-understanding
**Path:** `skills/assessment/check-understanding/`
**Purpose:** Verify understanding through reasoning and application questions, not recall trivia.
**When to use:** After any `teach-concept` or `socratic-mode` session; before advancing complexity.
**Escalates to:** `misconception-detector` if repeated errors; `socratic-mode` if confusion persists.

### challenge-generator
**Path:** `skills/assessment/challenge-generator/`
**Purpose:** Create targeted practice challenges (implement/debug/explain/design) calibrated to weak areas.
**When to use:** Post-teaching consolidation, exam prep, or weak-area reinforcement.
**Requires:** Confirmed concept understanding; at least one identified weak area or learning target.

### interview-mode
**Path:** `skills/assessment/interview-mode/`
**Purpose:** Simulate a technical interview with warm-up, core questions, follow-ups, and structured debrief.
**When to use:** Learner is preparing for an interview; confidence and communication are the training targets.
**Pair with:** `misconception-detector` (post-debrief for gaps found), `challenge-generator` (targeted practice).

### misconception-detector
**Path:** `skills/assessment/misconception-detector/`
**Purpose:** Classify misconception type (surface/structural/deep) and execute a targeted correction loop.
**When to use:** Repeated error pattern detected; learner believes they understand but applies incorrectly.
**Requires:** Observable error evidence; `check-understanding` or `challenge-generator` session data preferred.

---

## Memory

### learning-memory
**Path:** `skills/memory/learning-memory/`
**Purpose:** Capture and restore a structured learner profile across sessions.
**When to use:** At session start (restore) and session end (save) for any multi-session learning track.
**Feeds into:** All other skills via level, weak-area, and checkpoint data.

### weak-area-tracker
**Path:** `skills/memory/weak-area-tracker/`
**Purpose:** Score and prioritize weak areas by severity; select interventions and track resolution.
**When to use:** After any assessment event that identifies a weak area; at session planning time.
**Feeds into:** `lesson-plan`, `revision-mode`, `challenge-generator` (priority targeting).

---

## Productivity

### flashcards
**Path:** `skills/productivity/flashcards/`
**Purpose:** Generate and run active-recall flashcards for session concepts; update cards after corrections.
**When to use:** Post-teaching consolidation; pre-revision card generation; spaced-repetition deck management.
**Pair with:** `spaced-repetition` (for scheduling), `misconception-detector` (triggers card updates).

### revision-mode
**Path:** `skills/productivity/revision-mode/`
**Purpose:** Run a prioritized review session using recency, error history, and deadline relevance scoring.
**When to use:** Upcoming deadline; multi-week gap since last session; multiple accumulated weak areas.
**Requires:** Existing coverage history from `learning-memory` and `weak-area-tracker`.

### spaced-repetition
**Path:** `skills/productivity/spaced-repetition/`
**Purpose:** Schedule reviews at scientifically-calibrated expanding intervals using simplified SM2.
**When to use:** Learner is in a sustained track (3+ sessions) and needs long-term retention management.
**Pair with:** `flashcards` (card-level scheduling), `learning-memory` (cross-session persistence).

---

## Projects

### build-with-me
**Path:** `skills/projects/build-with-me/`
**Purpose:** Guide real project implementation from architecture through debugging, preserving learner ownership.
**When to use:** Learner is building a feature, system, or project and needs implementation coaching.
**Pair with:** `architecture-review` (design phase), `debug-teacher` (debugging phase), `project-review` (completion).

### architecture-review
**Path:** `skills/projects/architecture-review/`
**Purpose:** Critique a system design across correctness, scalability, reliability, maintainability, and observability using probe-first questioning.
**When to use:** Learner has proposed a design; `build-with-me` reaches architecture phase.
**Sequence:** Probe → Strengths → Issues → Alternatives → Revision checklist.

### debug-teacher
**Path:** `skills/projects/debug-teacher/`
**Purpose:** Coach hypothesis-driven debugging, requiring evidence gathering and learner reasoning before fixes.
**When to use:** Learner is stuck on a bug; error exists but cause is unclear.
**Must enforce:** Symptom clarification → evidence → hypotheses (learner first) → root cause mechanism.

### project-review
**Path:** `skills/projects/project-review/`
**Purpose:** Evaluate a completed or in-progress project across scope, correctness, quality, tests, and learning outcomes.
**When to use:** Milestone completion; `build-with-me` reaches a review checkpoint.
**Always includes:** Learner self-assessment first; Praise-Critique-Grow; retrospective question.
