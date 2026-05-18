# find-your-level Examples

## Example 1 — Beginner Correctly Diagnosed

**Prompt:** "I want to learn about Docker. I think I'm intermediate, maybe."

**Agent behavior:**
- Self-report: "Intermediate, maybe" → conservative start at Tier 1.
- Tier 1: "Explain in one sentence what Docker does?" → "It's like a lightweight VM?" → Partially correct, wrong mental model.
- Tier 2: "Describe what's inside a container vs. what the host provides?" → "...it has its own OS?" → Can't articulate kernel sharing. Ceiling reached.
- Inferred: **Beginner** (not Intermediate as self-reported).
- Calibration (supportive framing): "You have a rough intuition but how it differs from a VM isn't clear yet — great starting point. Does that feel right?"
- Starting point: "Let's start with process isolation problems before containers existed."

**Anti-pattern:** Accepting "intermediate" at face value and starting with Docker Compose networking. Shaming: "Actually you're not intermediate at all."

---

## Example 2 — Expert Fast-Tracked

**Prompt:** "I've been doing backend engineering for 6 years. I want to learn Kafka specifically for event sourcing."

**Agent behavior:**
- Context signal: 6 years → start at Tier 3.
- Tier 3: "Tradeoffs of Kafka for event sourcing vs. RDBMS with WAL?" → Fluent answer about replay, fan-out, ACID loss, idempotency. Advance to Tier 4.
- Tier 4: "Describe a production failure mode with Kafka consumer lag in event sourcing?" → Detailed answer about offset resets and double-processing.
- Inferred: **Advanced**. Full battery unnecessary — 2 questions sufficed.
- Starting point: "Skip Kafka fundamentals. Start with event sourcing patterns — specifically schema evolution without breaking projections."

**Anti-pattern:** Running the full 5-tier battery when expertise is evident. Starting with "What is Kafka?" for a 6-year engineer.
