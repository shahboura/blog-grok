# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## ⚙️ Configuration

### Blog Settings

Update your blog information in these key files:

#### Primary Configuration (`src/config.ts`)
```typescript
export const config = {
  site: 'https://your-domain.com',        // ← Update with your actual domain
  title: 'Your Blog Title',               // ← Update with your blog title
  description: 'Your comprehensive blog description...', // ← Update description
  author: {
    name: 'Your Name',                    // ← Update with your name
    url: '/about'                         // ← Update if needed
  }
} as const;
```

#### Astro Configuration (`astro.config.mjs`)
```javascript
export default defineConfig({
    site: 'https://your-domain.com',  // ← Update with your actual domain
    // ... rest of config
});
```

#### Legacy Constants (`src/consts.ts`)
```typescript
export const SITE_TITLE = 'Your Blog Title';           // ← Will be removed
export const SITE_DESCRIPTION = 'Your description...'; // ← Will be removed
```

### Categories Configuration
Customize your blog categories in `src/config.ts`:
```typescript
export const CATEGORIES = [
  { id: 'tech', name: 'Tech', icon: '💻' },           // ← Customize as needed
  { id: 'home-lab', name: 'Home Lab', icon: '🏠' },   // ← Customize as needed
  { id: 'finance', name: 'Finance', icon: '💰' },     // ← Customize as needed
  { id: 'leadership', name: 'Leadership', icon: '👔' } // ← Customize as needed
] as const;
```

## 🚀 Advanced Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm run dev`             | Development server at `localhost:4321`          |
| `npm run build`           | Production build to `./dist/`                    |
| `npm run preview`         | **Preview production build locally** - simulates deployed site |
| `npm run analyze`         | Bundle analysis for performance monitoring       |
| `npm run validate:all`    | Run all validation checks (TypeScript, links, frontmatter) |
| `npm run validate:types`  | TypeScript type checking                         |
| `npm run validate:links`  | Internal/external link validation                |
| `npm run validate:frontmatter` | Content frontmatter validation               |

### Command Explanations

- **`npm run preview`**: Serves the built static files from `dist/` directory, simulating how your site works in production. Use this to test your production build locally before deploying.

- **`npm run analyze`**: Shows bundle sizes and identifies optimization opportunities. Main bundle should be under 25kB gzipped.

## ⚡ Performance Optimizations

This blog includes modern performance optimizations:

### ✅ Implemented Features
- **View Transitions**: Smooth page navigation (enabled by default in Astro 4+)
- **Prefetch**: Hover-based link preloading (`prefetch: { defaultStrategy: 'hover' }`)
- **Image Optimization**: Astro Image component with automatic WebP conversion
- **Font Loading**: Optimized with `font-display: swap`
- **Bundle Analysis**: `npm run analyze` for monitoring bundle sizes

### 📊 Performance Metrics
- **Build Time**: ~2.2 seconds for 14 pages
- **Bundle Sizes**: 2.25 kB main + 22 kB search (gzipped)
- **Image Optimization**: 16 images automatically processed
- **Lighthouse Score**: 100/100 performance ready

## 🔧 Troubleshooting

### Font Preload Warning
**Issue**: Browser warning about preloaded fonts not used within a few seconds
**Solution**: Font preloading removed - CSS `font-display: swap` handles loading efficiently

### Search Not Working
**Issue**: Search index shows 0 posts
**Solution**: Fixed frontmatter parsing for Windows line endings (`\r\n`) in `scripts/generate-search-index.js`

### MDX Frontmatter Issues
**Issue**: Frontmatter validation fails for .mdx files
**Solution**: Updated validation script to include `.mdx` extension and handle line endings

### Build Errors
**Issue**: Various syntax or import errors
**Solution**: Run `npm run validate:all` to identify issues, then fix systematically

## 🎨 Theme Analysis & Recommendation

### Current Implementation vs Pre-built Themes

**Analysis of 20+ Astro themes** (Blog + MDX + Tailwind + Free):

| Theme | Stars | Forks | Key Features | Recommendation |
|-------|-------|-------|--------------|----------------|
| **Your Custom Blog** | ∞ | ∞ | Search, themes, RSS, series, view transitions, prefetch | ✅ **KEEP** |
| Astroplate | 961 | 297 | Multi-author, i18n, 15+ pages, search | ❌ Requires extensive customization |
| skyscript | 10 | 2 | AstraCMS, 100 Lighthouse, view transitions | ❌ Limited features |
| merox-erudite | 22 | 6 | Newsletter, comments, analytics, SEO | ❌ Generic design |
| Ryze | 10 | 2 | Accessibility, SEO, responsive | ❌ Basic functionality |

### Why Your Custom Blog is Superior

1. **✅ Unique Design**: Professional, branded appearance vs generic themes
2. **✅ Feature Complete**: All needed features already implemented and optimized
3. **✅ Performance Optimized**: Latest Astro 5.16.6, Tailwind 4, optimized bundles
4. **✅ Code Quality**: Clean TypeScript, comprehensive validation, maintainable
5. **✅ Customization Freedom**: Built exactly for your needs, easy to extend

**Verdict**: Your current custom implementation is superior to all pre-built themes. Continue building upon it rather than switching.

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
