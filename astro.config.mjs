// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import hyperTheme from './src/themes/hyper.json';

// TODO: Update this with your actual domain
// Update src/config.ts with your site details
export default defineConfig({
    site: 'https://your-domain.com',
    integrations: [mdx(), sitemap(), tailwind({
        applyBaseStyles: false
    })],
    markdown: {
        shikiConfig: {
            theme: hyperTheme
        }
    }
});