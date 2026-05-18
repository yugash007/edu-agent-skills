#!/usr/bin/env node

// edu-agent-skills CLI
// Install educational skills into any AI coding agent with one command.

import { detectAgents, resolveTarget, AGENTS } from '../src/agents.js';
import { getSkillCatalog, getSkill } from '../src/skills.js';
import { installSkills, removeSkills } from '../src/installer.js';

// ── Helpers ──────────────────────────────────────────────────────────

const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';
const CHECK = `${GREEN}✓${RESET}`;
const CROSS = `${RED}✗${RESET}`;
const WARN = `${YELLOW}!${RESET}`;
const ARROW = `${CYAN}→${RESET}`;

function log(msg = '') { console.log(msg); }
function heading(msg) { log(`\n${BOLD}${msg}${RESET}`); }

function parseArgs(argv) {
  const args = { _command: null, _positional: [], agent: null, skills: null, scope: 'global', target: null, help: false, yes: false };
  const raw = argv.slice(2);

  for (let i = 0; i < raw.length; i++) {
    const arg = raw[i];
    if (arg === '--help' || arg === '-h') { args.help = true; }
    else if (arg === '--yes' || arg === '-y') { args.yes = true; }
    else if ((arg === '--agent' || arg === '-a') && raw[i + 1]) { args.agent = raw[++i]; }
    else if ((arg === '--skills' || arg === '-s') && raw[i + 1]) { args.skills = raw[++i].split(',').map(s => s.trim()); }
    else if (arg === '--scope' && raw[i + 1]) { args.scope = raw[++i]; }
    else if ((arg === '--target' || arg === '-t') && raw[i + 1]) { args.target = raw[++i]; }
    else if (!arg.startsWith('-') && !args._command) { args._command = arg; }
    else if (!arg.startsWith('-')) { args._positional.push(arg); }
  }

  return args;
}

// ── Commands ─────────────────────────────────────────────────────────

function showHelp() {
  log(`
${BOLD}edu-agent-skills${RESET} — Plug educational skills into AI coding agents.

${BOLD}Usage:${RESET}
  npx edu-agent-skills ${CYAN}<command>${RESET} [options]

${BOLD}Commands:${RESET}
  ${CYAN}install${RESET}    Install skills into an agent's skill directory
  ${CYAN}remove${RESET}     Remove installed skills from an agent
  ${CYAN}list${RESET}       List all available skills
  ${CYAN}info${RESET}       Show details about a specific skill
  ${CYAN}detect${RESET}     Show which agents are detected on this system

${BOLD}Options:${RESET}
  ${DIM}--agent, -a${RESET}    Target agent (gemini, claude, cursor, codex). Auto-detects if omitted.
  ${DIM}--skills, -s${RESET}   Comma-separated skill names to install (all if omitted).
  ${DIM}--scope${RESET}        Installation scope: global (default) or project.
  ${DIM}--target, -t${RESET}   Custom target directory (overrides agent detection).
  ${DIM}--yes, -y${RESET}      Skip confirmation prompts.
  ${DIM}--help, -h${RESET}     Show this help message.

${BOLD}Examples:${RESET}
  ${DIM}# Auto-detect agent and install all skills${RESET}
  npx edu-agent-skills install

  ${DIM}# Install into Gemini CLI specifically${RESET}
  npx edu-agent-skills install --agent gemini

  ${DIM}# Install only specific skills${RESET}
  npx edu-agent-skills install --skills teach-concept,debug-teacher

  ${DIM}# Install into current project scope${RESET}
  npx edu-agent-skills install --scope project

  ${DIM}# Remove all installed skills from Claude${RESET}
  npx edu-agent-skills remove --agent claude

  ${DIM}# Install to a custom directory${RESET}
  npx edu-agent-skills install --target ./my-agent/skills
`);
}

function cmdDetect() {
  heading('Agent Detection');
  const detected = detectAgents();

  for (const [key, agent] of Object.entries(AGENTS)) {
    const found = detected.includes(key);
    log(`  ${found ? CHECK : CROSS} ${agent.name} ${DIM}(${key})${RESET}${found ? ` ${ARROW} ${agent.global}` : ''}`);
  }

  if (detected.length === 0) {
    log(`\n  ${WARN} No agents detected. Use ${CYAN}--target${RESET} to specify a custom directory.`);
  } else {
    log(`\n  ${DIM}${detected.length} agent(s) detected.${RESET}`);
  }
}

function cmdList() {
  const catalog = getSkillCatalog();
  heading(`Available Skills (${catalog.length})`);
  log();

  const grouped = {};
  for (const skill of catalog) {
    if (!grouped[skill.category]) grouped[skill.category] = [];
    grouped[skill.category].push(skill);
  }

  for (const [category, skills] of Object.entries(grouped)) {
    log(`  ${BOLD}${category}${RESET}`);
    for (const s of skills) {
      log(`    ${CYAN}${s.name.padEnd(24)}${RESET} ${DIM}${s.description}${RESET}`);
    }
    log();
  }
}

function cmdInfo(args) {
  const name = args._positional[0];
  if (!name) {
    log(`${RED}Error: specify a skill name.${RESET} Usage: npx edu-agent-skills info <skill-name>`);
    process.exit(1);
  }

  const skill = getSkill(name);
  if (!skill) {
    log(`${RED}Error: skill "${name}" not found.${RESET}`);
    const catalog = getSkillCatalog();
    const similar = catalog.filter(s => s.name.includes(name) || name.includes(s.name));
    if (similar.length > 0) {
      log(`${DIM}Did you mean: ${similar.map(s => s.name).join(', ')}?${RESET}`);
    }
    process.exit(1);
  }

  heading(skill.name);
  log(`  ${DIM}Category:${RESET}    ${skill.category}`);
  log(`  ${DIM}Version:${RESET}     ${skill.version}`);
  log(`  ${DIM}Status:${RESET}      ${skill.status}`);
  log(`  ${DIM}Description:${RESET} ${skill.description}`);
  log(`  ${DIM}Path:${RESET}        skills/${skill.category}/${skill.name}/`);
}

function resolveTargets(args) {
  // If custom target, use it directly
  if (args.target) {
    return [{ name: 'Custom', dir: args.target }];
  }

  // If specific agent requested
  if (args.agent) {
    return [resolveTarget(args.agent, args.scope)];
  }

  // Auto-detect
  const detected = detectAgents();
  if (detected.length === 0) {
    log(`${RED}Error: No agents detected.${RESET}`);
    log(`Use ${CYAN}--agent${RESET} to specify one, or ${CYAN}--target${RESET} for a custom directory.`);
    log(`Run ${CYAN}npx edu-agent-skills detect${RESET} to see available agents.`);
    process.exit(1);
  }

  return detected.map(key => resolveTarget(key, args.scope));
}

function cmdInstall(args) {
  const targets = resolveTargets(args);
  const filterSkills = args.skills || [];

  heading('Installing edu-agent-skills');

  if (filterSkills.length > 0) {
    log(`  ${DIM}Skills: ${filterSkills.join(', ')}${RESET}`);
  } else {
    log(`  ${DIM}Installing all ${getSkillCatalog().length} skills${RESET}`);
  }
  log();

  for (const target of targets) {
    log(`  ${ARROW} ${BOLD}${target.name}${RESET} ${DIM}→ ${target.dir}${RESET}`);

    const result = installSkills(target.dir, filterSkills, true);

    for (const name of result.installed) {
      log(`    ${CHECK} ${name}`);
    }
    for (const name of result.skipped) {
      log(`    ${WARN} ${name} ${DIM}(skipped)${RESET}`);
    }

    log(`    ${DIM}${result.installed.length} installed, ${result.skipped.length} skipped${RESET}`);
    log();
  }

  log(`  ${GREEN}Done!${RESET} Skills are ready to use.`);

  if (targets.some(t => t.name === 'Gemini CLI')) {
    log(`  ${DIM}Tip: In Gemini CLI, run /skills list to verify.${RESET}`);
  }
  if (targets.some(t => t.name === 'Claude Code')) {
    log(`  ${DIM}Tip: In Claude Code, skills activate automatically on matching prompts.${RESET}`);
  }
}

function cmdRemove(args) {
  const targets = resolveTargets(args);
  const filterSkills = args.skills || [];

  heading('Removing edu-agent-skills');

  for (const target of targets) {
    log(`  ${ARROW} ${BOLD}${target.name}${RESET} ${DIM}→ ${target.dir}${RESET}`);

    const result = removeSkills(target.dir, filterSkills);

    for (const name of result.removed) {
      log(`    ${CHECK} Removed ${name}`);
    }
    for (const name of result.notFound) {
      log(`    ${DIM}${name} (not installed)${RESET}`);
    }

    log(`    ${DIM}${result.removed.length} removed${RESET}`);
    log();
  }

  log(`  ${GREEN}Done!${RESET}`);
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  const args = parseArgs(process.argv);

  if (args.help || !args._command) {
    showHelp();
    process.exit(0);
  }

  switch (args._command) {
    case 'install':  cmdInstall(args); break;
    case 'remove':   cmdRemove(args); break;
    case 'uninstall': cmdRemove(args); break;
    case 'list':     cmdList(); break;
    case 'ls':       cmdList(); break;
    case 'info':     cmdInfo(args); break;
    case 'detect':   cmdDetect(); break;
    default:
      log(`${RED}Unknown command: "${args._command}"${RESET}`);
      log(`Run ${CYAN}npx edu-agent-skills --help${RESET} for usage.`);
      process.exit(1);
  }
}

main();
