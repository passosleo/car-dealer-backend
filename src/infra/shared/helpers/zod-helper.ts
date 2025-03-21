import z from 'zod';

export class ZodHelper {
  public static booleanField() {
    return z.enum(['true', 'false']).transform((v) => (v === 'true' ? true : v === 'false' ? false : undefined));
  }

  public static dateField(fieldName: string) {
    return z
      .string()
      .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: `${fieldName} must be in YYYY-MM-DD format`,
      })
      .transform((value) => (value ? new Date(value) : undefined));
  }
}
