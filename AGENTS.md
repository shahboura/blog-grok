# OpenCode Agents Repository

This repository contains customized agents for OpenCode.ai, aligned with Anthropic's skills framework.

## Project Structure

- `.opencode/agent/` - Custom agent configurations for OpenCode
- `docs/` - Documentation for agents and usage
- `AGENTS.md` - This file with project instructions

## Language-Specific Instructions

### .NET/C# Projects

Apply Clean Architecture principles:

- Follow dependency rules: Domain → Application → Infrastructure → WebAPI
- Use async/await with CancellationToken
- Enable nullable reference types
- Constructor injection for dependencies
- Entity Framework with IEntityTypeConfiguration

### Python Projects

- Always use type hints on function signatures
- Use context managers for resource management
- Prefer list comprehensions over loops
- Async/await for I/O operations
- Google-style docstrings for public APIs

### TypeScript Projects

- Enable strict mode in tsconfig.json
- Explicit types, no implicit any
- Strict null checks with optional chaining
- Generics for reusable code
- Utility types (Pick, Omit, Partial, etc.)

### Flutter/Dart Projects

- Use Riverpod for state management
- Feature-based architecture with clean separation
- Immutable data models with freezed
- Result pattern for error handling
- Provider pattern for dependency injection
- Widget testing for all UI components

## Agent Usage

Primary agents:

- `codebase` - Multi-language development with profile detection
- `orchestrator` - Strategic planning and complex workflow coordination
- `blogger` - Content creation for blogging, podcasting, and YouTube scripting
- `brutal-critic` - Ruthless content reviewer with framework-based criticism
- `em-advisor` - Engineering management guidance

Subagents:

- `docs` - Documentation and wiki generation specialist
- `review` - Code review specialist focusing on security, performance, and best practices

## Quality Requirements

All code changes must:

- Pass type checking (mypy, tsc --noEmit, flutter analyze)
- Pass linting (ruff, eslint, dart format)
- Pass all tests
- Follow language-specific conventions
- Include proper documentation

### Documentation Standards

All documentation changes must:

- Pass markdown linting (`npm run lint:md`)
- Have valid internal/external links (`npm run validate:docs`)
- Run validation before committing changes

## Session Summary Requirements

**All agents MUST summarize sessions upon task completion:**

### Summary Format

- **Context**: Brief description of what was accomplished
- **Key Decisions**: Important architectural or implementation choices made
- **Open Items**: Any follow-up tasks or unresolved issues
- **Lessons Learned**: Insights or patterns discovered during the session

### Summary Optimization

- Keep summaries concise and actionable
- Focus on information that would be valuable for future sessions
- Avoid redundant information from previous summaries
- Use bullet points for readability
- Include timestamps for chronological context

### Summary Location

Summaries should be added to this AGENTS.md file under a "Session Summaries" section for easy reference across sessions.

## Session Summaries

### 2025-12-28 13:50 - Fixed styling issues & implemented immediate improvements

**Agent:** orchestrator
**Summary:** Successfully resolved all styling issues (RSS, theme toggle, search), implemented centralized configuration, improved reading time calculation, verified series functionality, and validated all changes.

- Fixed RSS icon from file icon to proper RSS feed icon (three curved lines + dot)
- Unified header button styling with consistent design system (border radius, padding, hover effects)
- Enhanced theme toggle with clean outline SVG icons and improved hover states
- Refined search modal styling for better visual consistency with site design
- Created centralized config.ts for site settings, categories, and difficulty levels
- Updated content schema to support optional readingTime field (in minutes)
- Confirmed series landing page exists and works correctly at /blog/series/[...slug]
- Fixed unused TypeScript import warnings (CollectionEntry, SITE_DESCRIPTION)
- Ran full validation suite: TypeScript (0 errors, 0 warnings), markdown linting (passed), link validation (all valid), frontmatter (all valid)
- Build successful: 14 pages generated, search index created with 10 posts
- Workflow patterns that worked well: Systematic approach fixing UI issues before core functionality; centralized config reduces duplication
- Lessons learned for future orchestration: Clean, unified button styling improves UX; optional fields in schema allow flexibility while maintaining type safety

### 2025-12-28 13:25 - Set remote and push blog to GitHub

**Agent:** codebase  
**Summary:** Successfully set remote origin to GitHub repository and pushed all committed changes.

- Added remote origin pointing to git@github.com:shahboura/blog-grok.git
- Pushed master branch with 57 files to remote repository
- Set upstream tracking for future pushes
- Workflow patterns that worked well: Direct git commands for remote setup after local commits
- Lessons learned for future development: Remote setup ensures repository is available for collaboration and deployment

### 2025-12-28 13:20 - Run validation suite, test build, and commit blog implementation

**Agent:** codebase  
**Summary:** Successfully executed full validation suite, tested production build, and committed all changes with comprehensive commit message summarizing implemented blog features.

- Ran npm run validate:all passing all checks with minor warnings (unused import, missing difficulty fields)
- Executed npm run build successfully generating optimized static site with 14 pages and search index
- Committed 57 files with descriptive message covering all implemented phases (copy code, themes, series, validation, SEO)
- Workflow patterns that worked well: systematic validation and build testing before commit ensures deployment readiness
- Lessons learned for future development: Comprehensive commit messages with feature summaries improve project maintainability

### 2025-12-27 23:30 - Implemented minimal copy code button using modern Clipboard API

**Agent:** orchestrator
**Summary:** Completely redesigned copy code button with minimal, robust implementation following web.dev best practices and MDN documentation.

- Researched modern Clipboard API usage from MDN and web.dev documentation
- Implemented minimal button with inline CSS to avoid styling conflicts
- Used `navigator.clipboard.writeText()` for modern, secure clipboard access
- Removed complex animations, themes, and feedback states to prevent bugs
- Added basic error handling with console logging only
- Verified Clipboard API browser support (Chrome 66+, Firefox 63+, Safari 13.1+)
- Build passes successfully with no syntax errors
- Workflow patterns that worked well: Research-first approach using official documentation
- Lessons learned for future orchestration: Minimal code = fewer bugs; modern APIs are simpler than legacy methods

### 2025-12-27 23:25 - Fixed font preload warning for atkinson-regular.woff

**Agent:** orchestrator  
**Summary:** Successfully added font preload links for both Atkinson font variants to BaseHead.astro, resolving performance warnings while maintaining efficient font loading.

- Investigated BaseHead.astro and global.css for font declarations
- Added proper preload links with crossorigin attribute for atkinson-regular.woff and atkinson-bold.woff
- Verified build and dev server work correctly with changes
- Ensured font-display: swap remains in CSS for fallback loading
- Workflow patterns that worked well: systematic investigation of font loading setup before implementing fixes
- Lessons learned for future orchestration: Font preload warnings often indicate missing preload links for CSS-loaded fonts; proper crossorigin attribute is essential for font preloading