# Supported Agents

`edu-agent-skills` is designed for cross-agent portability. Install with one command; skills activate automatically.

## Installation

```bash
# Auto-detect agent and install all skills
npx edu-agent-skills install

# Or specify an agent
npx edu-agent-skills install --agent gemini
npx edu-agent-skills install --agent claude
npx edu-agent-skills install --agent cursor
npx edu-agent-skills install --agent codex

# Custom directory for any agent
npx edu-agent-skills install --target /path/to/agent/skills
```

## Agent Directories

| Agent | Global (user-level) | Project (workspace-level) |
|---|---|---|
| Gemini CLI | `~/.gemini/skills/` | `.gemini/skills/` |
| Claude Code | `~/.claude/skills/` | `.claude/skills/` |
| Cursor | `~/.cursor/skills/` | `.cursor/skills/` |
| OpenAI Codex | `~/.codex/skills/` | `.codex/skills/` |

Use `--scope project` to install into the project directory instead of global.

## How Skills Load

Each agent scans its skill directory for `SKILL.md` files. When your prompt matches a skill's activation logic, the agent loads the skill's instructions automatically.

### Gemini CLI
After installing, verify with `/skills list` in your Gemini CLI session.

### Claude Code
Skills activate automatically on matching prompts. No manual trigger needed.

### Cursor / Codex / Other Agents
Skills are injected as system/developer context when the task matches.

## Portability Rules

To keep skills portable across all runtimes:
- No runtime-specific APIs in core logic
- Describe outcomes, not tool internals
- Keep examples runtime-agnostic
