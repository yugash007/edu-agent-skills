# edu-agent-skills

Reusable educational skills for AI coding agents. Install into Gemini CLI, Claude Code, Cursor, and more with one command.

## Quick Start

```bash
# Auto-detect your agent and install all 20 skills
npx edu-agent-skills install

# Or target a specific agent
npx edu-agent-skills install --agent gemini
npx edu-agent-skills install --agent claude
```

That's it. Skills activate automatically when your agent encounters matching prompts.

## What This Does

Most coding agents can read files and answer questions. Fewer can teach effectively.

This package provides 20 reusable skill specifications that make agents:
- map curriculum structure before teaching,
- adapt explanations to learner level,
- use active recall and Socratic methods,
- coach implementation and debugging work,
- detect and correct misconceptions.

## CLI Usage

```bash
# List all available skills
npx edu-agent-skills list

# Show details about a skill
npx edu-agent-skills info teach-concept

# Detect which agents are installed
npx edu-agent-skills detect

# Install specific skills only
npx edu-agent-skills install --skills teach-concept,debug-teacher

# Install into project scope (not global)
npx edu-agent-skills install --scope project

# Install to a custom directory
npx edu-agent-skills install --target ./my-agent/skills

# Remove installed skills
npx edu-agent-skills remove --agent gemini
```

## Available Skills (20)

| Category | Skills |
|---|---|
| **Onboarding** | `repo-understand`, `find-your-level`, `lesson-plan` |
| **Teaching** | `teach-concept`, `socratic-mode`, `deep-dive`, `simplify-topic` |
| **Assessment** | `check-understanding`, `challenge-generator`, `interview-mode`, `misconception-detector` |
| **Memory** | `learning-memory`, `weak-area-tracker` |
| **Productivity** | `flashcards`, `revision-mode`, `spaced-repetition` |
| **Projects** | `build-with-me`, `architecture-review`, `debug-teacher`, `project-review` |

See [skills/INDEX.md](skills/INDEX.md) for full descriptions and composition logic.

## Supported Agents

| Agent | Auto-Detected | Install Location |
|---|---|---|
| Gemini CLI | ✓ | `~/.gemini/skills/` |
| Claude Code | ✓ | `~/.claude/skills/` |
| Cursor | ✓ | `~/.cursor/skills/` |
| OpenAI Codex | ✓ | `~/.codex/skills/` |
| Custom | — | Any path via `--target` |

## Core Philosophy

- **Active learning** over passive summarization
- **Socratic questioning** over answer dumping
- **Project-based practice** over abstract memorization
- **Prerequisite-aware sequencing** over random topic jumps
- **Misconception detection** over surface-level correction

## Skill Architecture

Every skill follows [docs/skill-standard.md](docs/skill-standard.md) and contains:
- `SKILL.md` — activation logic, workflow, rules, and output guidance
- `examples.md` — realistic interaction patterns and anti-patterns

Skills are designed for cross-agent portability. See [docs/supported-agents.md](docs/supported-agents.md).

## Contributing

We welcome skill contributions, improvements, and benchmark scenarios.

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [docs/skill-standard.md](docs/skill-standard.md)
- [templates/skill-template/SKILL.md](templates/skill-template/SKILL.md)

## License

Distributed under the MIT License. See [LICENSE](LICENSE).
