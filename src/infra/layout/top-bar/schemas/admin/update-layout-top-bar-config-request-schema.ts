import z from 'zod';
import { updateLayoutTopBarMessageRequestSchema } from './update-layout-top-bar-message-request-schema';

export const updateLayoutTopBarConfigRequestSchema = z.object({
  maxItems: z.number().optional(),
  loop: z.boolean().optional(),
  delay: z.number().optional(),
  direction: z.enum(['ltr', 'rtl']).nullable().optional(),
  jump: z.boolean().optional(),
  hideOnMobile: z.boolean().optional(),
  hideOnDesktop: z.boolean().optional(),
  layoutTopBarMessages: z.array(updateLayoutTopBarMessageRequestSchema).optional(),
});
