# Content Creator Guide

This guide helps content creators write and publish blog posts effectively on this Astro-powered blog.

## Frontmatter Fields

Every blog post must include frontmatter (the YAML section at the top of the Markdown file). Here's a complete reference:

### Required Fields

```yaml
---
title: "Your Blog Post Title"
description: "A compelling description under 160 characters for SEO"
pubDate: "2024-01-15"
category: "Tech"  # Must be one of: Tech, Home Lab, Finance, Leadership
---
```

### Recommended Fields

```yaml
---
title: "Your Blog Post Title"
description: "A compelling description under 160 characters"
pubDate: "2024-01-15"
updatedDate: "2024-01-20"  # Only include if post has been updated
heroImage: "../../assets/your-image.jpg"  # Path relative to content/blog/
tags: ["tag1", "tag2", "tag3"]  # Array of relevant tags
category: "Tech"
excerpt: "A short summary that appears in previews and series listings"
difficulty: "beginner"  # beginner, intermediate, or advanced
---
```

### Series Fields (Optional)

For multi-part series:

```yaml
---
# ... other fields ...
series: "Docker for Beginners"
part: 1  # Part number in the series
---
```

## Categories

Choose from these predefined categories:

- **Tech**: Programming, development, tools, software
- **Home Lab**: Self-hosting, servers, networking, hardware
- **Finance**: Investing, personal finance, money management
- **Leadership**: Management, career development, team building

## Writing Best Practices

### SEO Optimization

1. **Title**: Keep under 60 characters, include main keyword
2. **Description**: 120-160 characters, compelling and keyword-rich
3. **Headings**: Use H2, H3, H4 (avoid H1 as it's auto-generated)
4. **Keywords**: Include naturally in title, description, and content
5. **Internal Links**: Link to other posts in your blog
6. **External Links**: Use `rel="noopener"` for external links

### Content Structure

1. **Introduction**: Hook the reader, state the problem/solution
2. **Body**: Clear sections with descriptive headings
3. **Conclusion**: Summarize key points, call-to-action
4. **Code Blocks**: Use syntax highlighting, add copy buttons automatically
5. **Images**: Use descriptive alt text, optimize file sizes

### Markdown Tips

- Use `---` for thematic breaks
- Tables, lists, and blockquotes are supported
- Math expressions with `$...$` (if enabled)
- Footnotes with `[^1]` syntax

## Validation

Before committing, run validation:

```bash
npm run validate:all
```

This checks:
- Required frontmatter fields
- Valid categories and difficulty levels
- Date formats
- Series consistency (part numbers with series)
- Markdown linting
- Internal/external link validity

## Publishing Workflow

1. Create new `.md` file in `src/content/blog/`
2. Add frontmatter and content
3. Run validation: `npm run validate:all`
4. Test build: `npm run build`
5. Commit with conventional commit message
6. Push to trigger deployment

## Image Guidelines

- Place images in `src/assets/`
- Use descriptive filenames: `docker-container-setup.jpg`
- Optimize for web (under 500KB preferred)
- Provide alt text for accessibility
- Use hero images that are 1020x510px for best display

## Series Management

1. Plan all parts before publishing
2. Use consistent naming: "Docker for Beginners - Part 1"
3. Include navigation between parts
4. Update series overview when all parts are complete

## Troubleshooting

### Common Validation Errors

- **Missing required field**: Add the missing frontmatter field
- **Invalid category**: Choose from the predefined categories
- **Invalid date**: Use YYYY-MM-DD format
- **Broken link**: Check file paths and URLs

### Build Issues

- **TypeScript errors**: Check for type mismatches in frontmatter
- **Missing images**: Ensure image paths are correct
- **Malformed frontmatter**: Validate YAML syntax

## Support

For questions about content creation or technical issues, check:

1. This documentation
2. Existing blog posts for examples
3. Validation error messages
4. Build logs for detailed errors</content>
<parameter name="filePath">C:\Users\sheha\SynologyDrive\Drive\repos\blog\CONTENT_CREATOR_GUIDE.md