import z from 'zod';

export const layoutTopBarMessageResponseSchema = z.object({
  layoutTopBarMessageId: z.string(),
  layoutTopBarConfigId: z.string(),
  message: z.string(),
  link: z.string().url().nullable(),
  position: z.number(),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
