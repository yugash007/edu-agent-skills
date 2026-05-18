// Installer — copies skill folders to agent skill directories.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync, statSync } from 'fs';
import { join, basename } from 'path';
import { getSkillCatalog } from './skills.js';

/**
 * Copy a directory recursively (Node 18+ compatible).
 */
function copyDirSync(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      writeFileSync(destPath, readFileSync(srcPath));
    }
  }
}

/**
 * Install skills to a target directory.
 * @param {string} targetDir - The agent's skill directory
 * @param {string[]} [filterSkills] - Optional list of skill names to install (all if empty)
 * @param {boolean} [overwrite=true] - Overwrite existing skills
 * @returns {{ installed: string[], skipped: string[], total: number }}
 */
export function installSkills(targetDir, filterSkills = [], overwrite = true) {
  const catalog = getSkillCatalog();
  const installed = [];
  const skipped = [];

  // Filter skills if specific ones requested
  let toInstall = catalog;
  if (filterSkills.length > 0) {
    toInstall = catalog.filter(s => filterSkills.includes(s.name));
    const found = new Set(toInstall.map(s => s.name));
    for (const name of filterSkills) {
      if (!found.has(name)) {
        skipped.push(`${name} (not found)`);
      }
    }
  }

  mkdirSync(targetDir, { recursive: true });

  for (const skill of toInstall) {
    const destDir = join(targetDir, skill.name);

    if (existsSync(destDir) && !overwrite) {
      skipped.push(`${skill.name} (exists)`);
      continue;
    }

    // Copy skill directory (SKILL.md + examples.md + any other files)
    copyDirSync(skill.dir, destDir);
    installed.push(skill.name);
  }

  return { installed, skipped, total: catalog.length };
}

/**
 * Remove installed skills from a target directory.
 * @param {string} targetDir - The agent's skill directory
 * @param {string[]} [filterSkills] - Optional list of skill names to remove (all edu-skills if empty)
 * @returns {{ removed: string[], notFound: string[] }}
 */
export function removeSkills(targetDir, filterSkills = []) {
  const catalog = getSkillCatalog();
  const knownNames = new Set(catalog.map(s => s.name));
  const removed = [];
  const notFound = [];

  // If no filter, remove all known edu-agent-skills
  const toRemove = filterSkills.length > 0
    ? filterSkills
    : [...knownNames];

  for (const name of toRemove) {
    const destDir = join(targetDir, name);
    if (existsSync(destDir)) {
      rmSync(destDir, { recursive: true, force: true });
      removed.push(name);
    } else {
      notFound.push(name);
    }
  }

  return { removed, notFound };
}
