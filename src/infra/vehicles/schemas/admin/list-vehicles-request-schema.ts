import z from 'zod';
import { ZodHelper } from '../../../shared/helpers/zod-helper';

export const listVehiclesRequestSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
  orderBy: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
  status: z.enum(['all', 'active', 'inactive']).optional().default('all'),
  createdAtStart: ZodHelper.dateField('createdAtStart').optional(),
  createdAtEnd: ZodHelper.dateField('createdAtEnd').optional(),
  updatedAtStart: ZodHelper.dateField('updatedAtStart').optional(),
  updatedAtEnd: ZodHelper.dateField('updatedAtEnd').optional(),
  priceStart: z.coerce.number().optional(),
  priceEnd: z.coerce.number().optional(),
  mileageStart: z.coerce.number().optional(),
  mileageEnd: z.coerce.number().optional(),
  yearStart: z.coerce.number().optional(),
  yearEnd: z.coerce.number().optional(),
  doors: z.coerce.number().optional(),
  seats: z.coerce.number().optional(),
  horsepowerStart: z.coerce.number().optional(),
  horsepowerEnd: z.coerce.number().optional(),
});
