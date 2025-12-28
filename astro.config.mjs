// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.mjs';

// TODO: Update this with your actual domain
// Update src/config.ts with your site details
export default defineConfig({
    site: 'https://your-domain.com',
    prefetch: {
        defaultStrategy: 'hover'
    },
    integrations: [mdx(), sitemap(), tailwind({
        applyBaseStyles: false
    })],
    markdown: {
        remarkPlugins: [remarkReadingTime],
        shikiConfig: {
            theme: 'material-theme'
        }
    },
    vite: {
        optimizeDeps: {
            include: ['fuse.js']
        }
    }
});