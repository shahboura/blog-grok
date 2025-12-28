#!/usr/bin/env node

/**
 * Search index generation script for Astro blog
 * Generates a JSON search index from blog posts for client-side search
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contentDir = join(__dirname, '..', 'src', 'content', 'blog');
const outputPath = join(__dirname, '..', 'public', 'search-index.json');

// Collect all markdown files
function getMarkdownFiles(dir) {
  const files = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (extname(item) === '.md' || extname(item) === '.mdx') {
      files.push(fullPath);
    }
  }

  return files;
}

// Parse frontmatter from markdown (handle both \n and \r\n)
function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter = {};
  const lines = frontmatterMatch[1].split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();
    const match = trimmedLine.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      // Handle arrays (tags)
      if (key === 'tags' && value.startsWith('[')) {
        try {
          frontmatter[key] = JSON.parse(value.replace(/'/g, '"'));
        } catch {
          frontmatter[key] = [];
        }
      } else {
        frontmatter[key] = value.replace(/^["']|["']$/g, ''); // Remove quotes
      }
    }
  }

  return frontmatter;
}

// Extract slug from file path
function getSlug(filePath) {
  const relativePath = filePath.replace(join(__dirname, '..', 'src', 'content', 'blog'), '');
  return relativePath.replace(/^[/\\]/, '').replace(/\.mdx?$/, '');
}

async function generateSearchIndex() {
  console.log('🔍 Generating search index...');

  const markdownFiles = getMarkdownFiles(contentDir);
  const searchIndex = [];

  for (const file of markdownFiles) {
    const content = readFileSync(file, 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter) {
      console.warn(`⚠️  No frontmatter found in ${file.split('/').pop()}`);
      continue;
    }

    // Skip if required fields are missing
    if (!frontmatter.title || !frontmatter.description || !frontmatter.pubDate || !frontmatter.category) {
      console.warn(`⚠️  Missing required fields in ${file.split('/').pop()}`);
      continue;
    }

    const slug = getSlug(file);
    const post = {
      id: slug,
      slug: slug,
      title: frontmatter.title,
      description: frontmatter.description,
      excerpt: frontmatter.excerpt || frontmatter.description,
      tags: frontmatter.tags || [],
      category: frontmatter.category,
      difficulty: frontmatter.difficulty || null,
      series: frontmatter.series || null,
      part: frontmatter.part || null,
      pubDate: frontmatter.pubDate,
      updatedDate: frontmatter.updatedDate || null,
      // Combine searchable content
      content: `${frontmatter.title} ${frontmatter.description} ${frontmatter.excerpt || frontmatter.description} ${frontmatter.tags?.join(' ') || ''} ${frontmatter.category}`,
    };

    searchIndex.push(post);
  }

  // Sort by publication date (newest first)
  searchIndex.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  // Write search index to public directory
  writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));

  console.log(`✅ Generated search index with ${searchIndex.length} posts at ${outputPath}`);
}

generateSearchIndex().catch(console.error);