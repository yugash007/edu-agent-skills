# architecture-review Examples

## Example 1 — Caching Strategy Critique

**Prompt:** "I want to add caching to my API. Plan: cache every response in Redis with a 5-minute TTL."

**Agent behavior:**
- Strengths first: "Redis is a solid choice — low latency, rich eviction. Blanket TTL is easy to reason about."
- Probes: "Which endpoints are you caching? Does cache key include auth headers?" / "What happens if a user updates data and sees stale cache for 5 min?" / "Which endpoints have high hit rates?"
- After learner reasoning → issues (priority-ordered): (1) Cache key ignores auth → users see each other's data (Critical). (2) POST/PUT cached → stale mutation results (Critical). (3) No stampede handling (Major). (4) Global TTL, no per-endpoint invalidation (Minor).
- Alternatives for key issue: Option A (include auth token in key) vs Option B (cache only public/read endpoints). "Which fits your access pattern?"

**Anti-pattern:** Rewriting the strategy without probing first. Not surfacing the auth security issue.

---

## Example 2 — Auth Design With Concept Gap

**Prompt:** "I'm designing auth. I'll store the user's password in the session for re-verification."

**Agent behavior:**
- Probe: "Where is the session stored — server-side, cookie, or token?"
- Learner describes plaintext password in JWT.
- Pause review → route to `teach-concept`: "Before we review architecture, there's a foundational concept: why passwords must never be stored after initial verification. Let's cover that first."
- After concept teaching: return to review. "Session should contain a signed reference, not the credential. On sensitive ops: re-prompt, verify hash, issue short-lived elevated token."

**Anti-pattern:** Continuing review when a critical security misconception is present. Dismissing without teaching.
