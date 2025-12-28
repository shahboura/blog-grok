// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import hyperTheme from './src/themes/hyper.json';

// https://astro.build/config
export default defineConfig({
    site: 'https://astro-blog.example.com',
    integrations: [mdx(), sitemap(), tailwind({
        applyBaseStyles: false
    })],
    markdown: {
        shikiConfig: {
            theme: hyperTheme
        }
    }
});