#!/usr/bin/env node

/**
 * Frontmatter validation script for Astro blog
 * Validates that all blog posts have required frontmatter fields
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contentDir = join(__dirname, '..', 'src', 'content', 'blog');

let hasErrors = false;

// Required frontmatter fields
const requiredFields = [
  'title',
  'description',
  'pubDate',
  'category'
];

// Optional but recommended fields
const recommendedFields = [
  'excerpt',
  'difficulty',
  'tags'
];

// Valid categories
const validCategories = ['Tech', 'Home Lab', 'Finance', 'Leadership'];

// Valid difficulty levels
const validDifficulties = ['beginner', 'intermediate', 'advanced'];

// Collect all markdown files
function getMarkdownFiles(dir) {
  const files = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (extname(item) === '.md') {
      files.push(fullPath);
    }
  }

  return files;
}

// Parse frontmatter from markdown
function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter = {};
  const lines = frontmatterMatch[1].split('\n');

  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      frontmatter[key] = value.replace(/^["']|["']$/g, ''); // Remove quotes
    }
  }

  return frontmatter;
}

function validateFrontmatter(filePath, frontmatter) {
  const fileName = filePath.split('/').pop();

  // Check required fields
  for (const field of requiredFields) {
    if (!frontmatter[field]) {
      console.error(`❌ Missing required field '${field}' in ${fileName}`);
      hasErrors = true;
    }
  }

  // Check category validity
  if (frontmatter.category && !validCategories.includes(frontmatter.category)) {
    console.error(`❌ Invalid category '${frontmatter.category}' in ${fileName}. Valid categories: ${validCategories.join(', ')}`);
    hasErrors = true;
  }

  // Check difficulty validity
  if (frontmatter.difficulty && !validDifficulties.includes(frontmatter.difficulty)) {
    console.error(`❌ Invalid difficulty '${frontmatter.difficulty}' in ${fileName}. Valid difficulties: ${validDifficulties.join(', ')}`);
    hasErrors = true;
  }

  // Check date format
  if (frontmatter.pubDate) {
    const date = new Date(frontmatter.pubDate);
    if (isNaN(date.getTime())) {
      console.error(`❌ Invalid pubDate format in ${fileName}: ${frontmatter.pubDate}`);
      hasErrors = true;
    }
  }

  // Check series/part consistency
  if (frontmatter.series && !frontmatter.part) {
    console.warn(`⚠️  Post has series '${frontmatter.series}' but no part number in ${fileName}`);
  }

  if (frontmatter.part && !frontmatter.series) {
    console.error(`❌ Post has part number ${frontmatter.part} but no series in ${fileName}`);
    hasErrors = true;
  }

  // Check tags format
  if (frontmatter.tags) {
    try {
      const tags = JSON.parse(frontmatter.tags.replace(/'/g, '"'));
      if (!Array.isArray(tags)) {
        console.error(`❌ Tags field must be an array in ${fileName}`);
        hasErrors = true;
      }
    } catch {
      console.error(`❌ Invalid tags format in ${fileName}`);
      hasErrors = true;
    }
  }

  // Check recommended fields
  for (const field of recommendedFields) {
    if (!frontmatter[field]) {
      console.warn(`⚠️  Missing recommended field '${field}' in ${fileName}`);
    }
  }
}

async function main() {
  console.log('📝 Validating frontmatter...');

  const markdownFiles = getMarkdownFiles(contentDir);

  for (const file of markdownFiles) {
    const content = readFileSync(file, 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter) {
      console.error(`❌ No frontmatter found in ${file.split('/').pop()}`);
      hasErrors = true;
      continue;
    }

    validateFrontmatter(file, frontmatter);
  }

  if (hasErrors) {
    console.error('\n❌ Frontmatter validation failed!');
    process.exit(1);
  } else {
    console.log('✅ All frontmatter is valid!');
  }
}

main().catch(console.error);