import z from 'zod';
import { layoutTopBarMessageResponseSchema } from './layout-top-bar-message-response-schema';

export const layoutTopBarConfigResponseSchema = z.object({
  layoutTopBarConfigId: z.string(),
  layoutComponentId: z.string(),
  maxItems: z.number(),
  loop: z.boolean(),
  delay: z.number(),
  direction: z.string().nullable(),
  jump: z.boolean(),
  hideOnMobile: z.boolean(),
  hideOnDesktop: z.boolean(),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  layoutTopBarMessages: z.array(layoutTopBarMessageResponseSchema),
});
