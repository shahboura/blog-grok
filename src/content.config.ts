import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).optional(),
			category: z.string(),
			series: z.string().optional(),
			part: z.number().optional(),
			difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
			excerpt: z.string(),
			readingTime: z.number().optional(), // Add optional readingTime field (in minutes, added by remark plugin)
			featured_image: image().optional(),
			canonical: z.string().url().optional(),
		}),
});

export const collections = { blog };
