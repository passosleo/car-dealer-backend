import z from 'zod';

export const updateVehicleRequestSchema = z.object({
  model: z.string().nonempty().min(3).max(255),
  year: z.coerce.number().int().positive().min(1900),
  plate: z
    .string()
    .nonempty()
    .regex(/^([A-Z]{3}-\d{4}|[A-Z]{3}-\d[A-Z]\d{2})$/, {
      message: 'The plate must be in the format AAA-0000 or AAA-0A00',
    })
    .transform((val) => val.toUpperCase()),
  description: z.string().nonempty().max(1000).nullable(),
  price: z.coerce.number().positive(),
  mileage: z.coerce.number().positive().nullable(),
  color: z.string().min(3).max(50).nullable(),
  transmission: z.enum(['MANUAL', 'AUTOMATIC']).nullable(),
  fuelType: z.enum(['GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID']).nullable(),
  doors: z.coerce.number().positive().nullable(),
  seats: z.coerce.number().positive().nullable(),
  horsepower: z.coerce.number().positive().nullable(),
  torque: z.coerce.number().positive().nullable(),
  driveTrain: z.enum(['FWD', 'RWD', 'AWD', '4WD']).nullable(),
  brandId: z.string().uuid(),
  categoryId: z.string().uuid(),
  active: z.boolean(),
  vehicleImages: z.array(z.string().nonempty()),
  vehicleFeatures: z.array(z.string().nonempty()).optional().default([]),
});
