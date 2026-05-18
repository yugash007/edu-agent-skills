# spaced-repetition Examples

## Example 1 — Overdue Review Session

**Prompt:** "Let's start a new session. What's first?"

**Agent behavior:**
- Due check: 4 items due today, 2 overdue (2+ days late). Reports: "~10 minutes of review before we continue the lesson. Starting with overdue items."
- Review execution: presents front only → learner responds → back revealed → self-score.
  - Example item (overdue 3 days): composite index query — learner answers correctly → Easy → interval 8 × 1.3 = 10 days.
- After all items: score distribution (3 Easy, 2 Good, 1 Failed). Failed item re-tested within session. 7-day forecast: "2024-01-27 has 5 items — consider reviewing 1 day early to spread load."

**Anti-pattern:** Skipping due items to get to new content. Not warning about upcoming review spikes.

---

## Example 2 — Mastery Detection and Archival

**Context:** Learner has reviewed "TCP vs. UDP tradeoffs" in 5 consecutive sessions, each scoring Easy. EF at 2.5 (max), interval at 45 days.

**Agent behavior:**
- Mastery threshold reached: 5 consecutive Easy, EF > 2.4, interval > 30 days.
- Dialogue: "You've aced this 5 sessions in a row at max ease factor. Moving to mastery track — appears once every 60 days for maintenance. Sound good?"
- If agreed: status → mastered, maintenance interval 60 days, archived (not deleted — regression possible).
- If regression later: "TCP vs UDP scored Failed in maintenance — re-opened, interval reset to 3 days, status active."

**Anti-pattern:** Keeping mastered cards in active daily rotation indefinitely. Deleting permanently — regression happens.
