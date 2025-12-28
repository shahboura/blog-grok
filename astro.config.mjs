// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.mjs';
import expressiveCode from 'astro-expressive-code';

// TODO: Update this with your actual domain
// Update src/config.ts with your site details
export default defineConfig({
    site: 'https://your-domain.com',
    prefetch: {
        defaultStrategy: 'hover'
    },
    integrations: [expressiveCode({
        themes: ['material-theme']
    }), mdx(), sitemap(), tailwind({
        applyBaseStyles: false
    })],
    markdown: {
        remarkPlugins: [remarkReadingTime]
    },
    vite: {
        optimizeDeps: {
            include: ['fuse.js']
        }
    }
});