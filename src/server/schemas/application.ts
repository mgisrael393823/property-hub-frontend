import { z } from 'zod';

export const ApplicationSchema = z.object({
  id: z.string(),
  creatorId: z.string(),
  projectId: z.string(),
  status: z.enum(['pending','approved','rejected']).default('pending'),
  submittedAt: z.string().refine(val => !isNaN(Date.parse(val)), { message: 'invalid date' }),
});

export type Application = z.infer<typeof ApplicationSchema>;
