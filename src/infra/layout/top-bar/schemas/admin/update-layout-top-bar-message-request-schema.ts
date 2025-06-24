import z from 'zod';

export const updateLayoutTopBarMessageRequestSchema = z.object({
  message: z.string().min(1).max(255),
  link: z.string().url().nullable().optional(),
  active: z.boolean().optional(),
});
