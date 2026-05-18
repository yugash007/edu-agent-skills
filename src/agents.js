// Agent registry — maps agent names to their skill directories.
// Each agent has a global (user-level) and project (workspace-level) path.

import { homedir } from 'os';
import { join } from 'path';
import { existsSync } from 'fs';

const HOME = homedir();

export const AGENTS = {
  gemini: {
    name: 'Gemini CLI',
    global: join(HOME, '.gemini', 'skills'),
    project: join(process.cwd(), '.gemini', 'skills'),
    detect: () => existsSync(join(HOME, '.gemini')),
  },
  claude: {
    name: 'Claude Code',
    global: join(HOME, '.claude', 'skills'),
    project: join(process.cwd(), '.claude', 'skills'),
    detect: () => existsSync(join(HOME, '.claude')),
  },
  cursor: {
    name: 'Cursor',
    global: join(HOME, '.cursor', 'skills'),
    project: join(process.cwd(), '.cursor', 'skills'),
    detect: () => existsSync(join(HOME, '.cursor')),
  },
  codex: {
    name: 'OpenAI Codex',
    global: join(HOME, '.codex', 'skills'),
    project: join(process.cwd(), '.codex', 'skills'),
    detect: () => existsSync(join(HOME, '.codex')),
  },
};

/**
 * Auto-detect installed agents by checking for their config directories.
 * Returns an array of agent keys that are detected.
 */
export function detectAgents() {
  return Object.entries(AGENTS)
    .filter(([_, agent]) => agent.detect())
    .map(([key]) => key);
}

/**
 * Resolve the target directory for a given agent and scope.
 * @param {string} agentKey - Agent identifier (gemini, claude, cursor, codex)
 * @param {'global'|'project'} scope - Installation scope
 * @returns {{ name: string, dir: string }} Agent name and target directory
 */
export function resolveTarget(agentKey, scope = 'global') {
  const agent = AGENTS[agentKey];
  if (!agent) {
    throw new Error(`Unknown agent: "${agentKey}". Available: ${Object.keys(AGENTS).join(', ')}`);
  }
  return { name: agent.name, dir: agent[scope] };
}
