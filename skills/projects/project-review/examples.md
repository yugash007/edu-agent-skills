# project-review Examples

## Example 1 — Feature Completion Review

**Prompt:** "I finished the REST API for my task management app. Can you review it?"

**Agent behavior:**
- Self-assessment first: "Before I review — what do you think went well? What would you change?"
- Learner: "Happy with the routing, not sure about error handling."
- Praise: (1) Clean RESTful route design with consistent naming. (2) Input validation on all POST endpoints. (3) Good separation of route handlers from business logic.
- Critique (top 3): (1) Correctness: no error handling for database connection failures — app crashes silently (Major). (2) Testing: only happy-path tests, no edge case coverage (Major). (3) Code Quality: repeated auth middleware logic in 4 routes — extract to shared middleware (Minor).
- Grow: (1) "Add try-catch around DB calls and return structured error responses — run `challenge-generator` on error handling patterns." (2) "Write 3 edge-case tests: invalid input, missing resource, DB timeout."
- Retrospective: "What's the most important thing you learned from building this?"

**Anti-pattern:** Starting with critique. Listing 10 issues. Rewriting the learner's error handling code.

---

## Example 2 — Mid-Project Checkpoint

**Context:** Session 4 of `build-with-me`. Learner completed the data model and API layer. Next milestone: frontend integration.

**Agent behavior:**
- Self-assessment: "How do you feel about the API layer? Anything you'd revisit?"
- Praise: "Your data model handles the core relationships well. The API endpoints map cleanly to the requirements."
- Critique: (1) No pagination on list endpoints — will break at scale (Major). (2) API returns raw DB objects — missing response serialization (Minor).
- Grow: "Add pagination before frontend integration — it's much harder to retrofit. I'd recommend cursor-based over offset-based for your use case."
- Retrospective: "What design decision would you make differently if you started over?"
- Handoff: "Ready for frontend milestone once pagination is added. Want me to outline the next milestone?"

**Anti-pattern:** Skipping the checkpoint and moving to frontend with known API issues. Not asking the retrospective question.
