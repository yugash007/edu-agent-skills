// Skill catalog — reads the skills/ directory and parses YAML frontmatter.

import { readdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SKILLS_ROOT = join(__dirname, '..', 'skills');

const CATEGORIES = ['onboarding', 'teaching', 'assessment', 'memory', 'productivity', 'projects'];

/**
 * Parse YAML frontmatter from a SKILL.md file.
 * Minimal parser — handles the simple key: value and key: [array] patterns.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const meta = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.+)$/);
    if (kv) {
      let val = kv[2].trim();
      // Handle inline arrays: [tag1, tag2]
      if (val.startsWith('[') && val.endsWith(']')) {
        val = val.slice(1, -1).split(',').map(s => s.trim());
      }
      meta[kv[1]] = val;
    }
  }
  return meta;
}

/**
 * Get all skills as a structured catalog.
 * @returns {Array<{ name, category, description, version, status, dir }>}
 */
export function getSkillCatalog() {
  const catalog = [];

  for (const category of CATEGORIES) {
    const catDir = join(SKILLS_ROOT, category);
    if (!existsSync(catDir)) continue;

    for (const skillName of readdirSync(catDir, { withFileTypes: true })) {
      if (!skillName.isDirectory()) continue;

      const skillDir = join(catDir, skillName.name);
      const skillFile = join(skillDir, 'SKILL.md');
      if (!existsSync(skillFile)) continue;

      const content = readFileSync(skillFile, 'utf-8');
      const meta = parseFrontmatter(content);

      catalog.push({
        name: meta.name || skillName.name,
        category,
        description: meta.description || '',
        version: meta.version || '0.0.0',
        status: meta.status || 'draft',
        dir: skillDir,
      });
    }
  }

  return catalog;
}

/**
 * Get a single skill by name.
 */
export function getSkill(name) {
  return getSkillCatalog().find(s => s.name === name);
}

/**
 * Get the absolute path to the skills root directory.
 */
export function getSkillsRoot() {
  return SKILLS_ROOT;
}
