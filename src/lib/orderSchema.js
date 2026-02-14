import { z } from 'zod';

const quantitySchema = z.preprocess(
  (value) => (typeof value === 'string' ? Number.parseInt(value, 10) : value),
  z.number().int().min(1).max(50)
);

const budgetSchema = z.preprocess(
  (value) => {
    if (value === undefined || value === null || value === '') return undefined;
    return typeof value === 'string' ? Number.parseInt(value, 10) : value;
  },
  z.number().int().min(50).max(10000)
);

export const orderInputSchema = z.object({
  customerName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z
    .string()
    .min(7)
    .max(20)
    .regex(/^[0-9+()\-\s]*$/)
    .optional(),
  pairType: z.string().min(3).max(50),
  size: z.string().min(1).max(20),
  color: z.string().min(1).max(30),
  quantity: quantitySchema,
  notes: z.string().max(1000).optional(),
  contactPreference: z.enum(['email', 'sms', 'call']).default('email'),
  urgency: z.enum(['standard', 'rush']).default('standard'),
  budget: budgetSchema.optional(),
  catalogSnapshot: z
    .object({
      id: z.string(),
      name: z.string(),
      basePrice: z.number(),
      availableColors: z.array(z.string())
    })
    .optional(),
  rawPayload: z.record(z.any()).optional()
});
