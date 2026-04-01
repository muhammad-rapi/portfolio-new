import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    liveUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    image: z.string().optional(),
    order: z.number().default(99),
  }),
});

const aboutCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/about' }),
  schema: z.object({
    headline: z.string(),
    stats: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })),
    image: z.string().optional(),
  }),
});

const skillsCollection = defineCollection({
  loader: glob({ pattern: 'skills.json', base: './src/content' }),
  schema: z.object({
    categories: z.array(z.object({
      name: z.string(),
      nameId: z.string(),
      skills: z.array(z.string()),
    })),
  }),
});

const experienceCollection = defineCollection({
  loader: glob({ pattern: 'experience.json', base: './src/content' }),
  schema: z.array(z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    description: z.string(),
  })),
});

export const collections = {
  projects: projectsCollection,
  about: aboutCollection,
  skills: skillsCollection,
  experience: experienceCollection,
};
