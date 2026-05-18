# flashcards Examples

## Example 1 — Generate Cards for Sorting Algorithms

**Prompt:** "I just learned about merge sort and quicksort. Can you make me some flashcards?"

**Agent behavior:**
- Confirms understanding was validated earlier (ran `check-understanding`).
- Generates 3 cards across types:
  - *Mechanism*: "Trace merge sort on [5, 2, 8, 1]. How many merge operations?" → Back: 3 merges, always O(n log n).
  - *Tradeoff*: "When would you choose quicksort over merge sort?" → Back: in-place (O(1) space), better cache locality, but O(n²) worst case with naive pivot.
  - *Debug*: "What's wrong with always picking last element as pivot on [1,2,3,4,5]?" → Back: worst case O(n²), fix with random/median-of-three pivot.
- Tests all 3 immediately: front shown → learner responds → back revealed → self-score.

**Anti-pattern:** All definition-only cards ("What is merge sort?"). Creating cards before understanding is confirmed.

---

## Example 2 — Card Update After Misconception Correction

**Context:** `misconception-detector` corrected learner's model of database index behavior. Existing card reinforces incorrect model.

**Agent behavior:**
- Old card: "Do indexes always improve query speed?" → "Yes — indexes allow finding rows without scanning."
- Updated card: "Under what conditions does an index HURT performance?" → "Low selectivity (random I/O > sequential scan), write-heavy workloads (every write updates index), covering index too wide."
- Notifies learner: "Old card suspended — it reinforced the wrong model. Updated card tests your corrected understanding."

**Anti-pattern:** Leaving incorrect cards in deck after misconception correction. Silently deleting without explanation.
