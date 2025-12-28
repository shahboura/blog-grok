// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.mjs';

import tailwind from '@astrojs/tailwind';
import hyperTheme from './src/themes/hyper.json';
import react from '@astrojs/react';

// TODO: Update this with your actual domain
// Update src/config.ts with your site details
export default defineConfig({
    site: 'https://your-domain.com',
    prefetch: {
        defaultStrategy: 'hover'
    },
    integrations: [mdx(), sitemap(), tailwind({
        applyBaseStyles: false
    }), react()],
    markdown: {
        remarkPlugins: [remarkReadingTime],
        shikiConfig: {
            theme: hyperTheme
        }
    }
});