import { z } from 'zod';

export const CreatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
});

export type Creator = z.infer<typeof CreatorSchema>;
