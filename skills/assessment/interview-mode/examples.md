# interview-mode Examples

## Example 1 — Coding Interview (LC-Style)

**Prompt:** "Give me a mock coding interview for arrays and hash maps. I have an interview in two days."

**Agent behavior:**
- Setup: Coding, relaxed timing, 1 warm-up + 1 core + follow-ups, ~25 min. States interviewer framing.
- Warm-up: "Time complexity difference between list lookup vs. dictionary lookup in Python, and why?"
- Core: Two Sum problem — return indices of two numbers adding to target.
- Follow-ups: (1) Time/space complexity — can you do O(n)? (2) What if same element used twice? (3) What if input were sorted — better approach?
- Maintains interviewer persona throughout — no teaching mid-answer.
- Debrief scores all 4 dimensions with evidence: e.g., Correctness 4/5 (missed duplicate edge case), Communication 3/5 (jumped to code before explaining approach), Edge Case Coverage 2/5 (didn't consider negatives/empty input).
- Remediation: "Practice think-aloud before coding. Before writing code, list 3 edge cases."

**Anti-pattern:** Explaining the optimal solution mid-simulation. No follow-ups after first answer. Vague debrief.

---

## Example 2 — Recovery: Learner Freezes

**Prompt (mid-simulation):** "I'm completely blanking. I don't know where to start."

**Agent behavior:**
- Pause without breaking frame: "In a real interview, say 'Let me take a moment.' Start by telling me: what are the 2–3 main things this system needs to do?"
- If still blocked: exit simulation mode explicitly. Diagnose: component design? capacity math? vocabulary?
- If recovers: re-enter simulation from high-level design phase.
- If fundamentals missing: recommend `teach-concept` on distributed system fundamentals before retry.
- Debrief note: freeze is not scored against learner — flag as "blocked due to foundational gap" and route to remediation.

**Anti-pattern:** Continuing when learner is clearly distressed. Ending without diagnosing whether it was anxiety or knowledge gap.
