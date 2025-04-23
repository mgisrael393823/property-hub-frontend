import { z } from 'zod';

export const CreatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  // TODO: add more creator fields
});

export type Creator = z.infer<typeof CreatorSchema>;
