#!/usr/bin/env node

/**
 * Link validation script for Astro blog
 * Checks internal links and external URLs for validity
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contentDir = join(__dirname, '..', 'src', 'content', 'blog');

let hasErrors = false;

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

// Extract links from markdown content
function extractLinks(content, filePath) {
  const links = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

   while ((match = linkRegex.exec(content)) !== null) {
     const [, text, url] = match;
    links.push({
      text,
      url,
      file: filePath,
      line: content.substring(0, match.index).split('\n').length
    });
  }

  return links;
}

// Validate internal links
function validateInternalLink(url, filePath) {
  // Skip example/documentation links that are meant to be placeholders
  if (url.includes('full/or/relative/path/of/image') ||
      url.includes('blog-placeholder-about.jpg') ||
      url.includes('example.com')) {
    return true;
  }

  // Remove leading slash and .md extension
  let cleanUrl = url.replace(/^\//, '').replace(/\.md$/, '');

  // Check if it's a blog post
  if (cleanUrl.startsWith('blog/')) {
    const postPath = join(__dirname, '..', 'src', 'content', 'blog', cleanUrl.replace('blog/', '') + '.md');
    try {
      statSync(postPath);
      return true;
    } catch {
      console.error(`❌ Broken internal link in ${filePath}: ${url} (file not found)`);
      hasErrors = true;
      return false;
    }
  }

  // Check if it's a page
  const pagePath = join(__dirname, '..', 'src', 'pages', cleanUrl + '.astro');
  try {
    statSync(pagePath);
    return true;
  } catch {
    // Check for index.astro in directory
    const indexPath = join(__dirname, '..', 'src', 'pages', cleanUrl, 'index.astro');
    try {
      statSync(indexPath);
      return true;
    } catch {
      console.error(`❌ Broken internal link in ${filePath}: ${url} (page not found)`);
      hasErrors = true;
      return false;
    }
  }
}

// Validate external links (basic check)
function validateExternalLink(url) {
  try {
    new URL(url);
    // Could add more sophisticated external link checking here
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log('🔗 Validating links...');

  const markdownFiles = getMarkdownFiles(contentDir);
  const allLinks = [];

  // Extract links from all markdown files
  for (const file of markdownFiles) {
    const content = readFileSync(file, 'utf-8');
    const links = extractLinks(content, file);
    allLinks.push(...links);
  }

  // Validate links
  for (const link of allLinks) {
    if (link.url.startsWith('http://') || link.url.startsWith('https://')) {
      // External link
      if (!validateExternalLink(link.url)) {
        console.error(`❌ Invalid external URL in ${link.file}:${link.line}: ${link.url}`);
        hasErrors = true;
      }
    } else if (link.url.startsWith('#')) {
      // Anchor link - skip for now
      continue;
    } else {
      // Internal link
      validateInternalLink(link.url, link.file);
    }
  }

  if (hasErrors) {
    console.error('\n❌ Link validation failed!');
    process.exit(1);
  } else {
    console.log('✅ All links are valid!');
  }
}

main().catch(console.error);