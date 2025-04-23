import { z } from 'zod';

export const ApplicationSchema = z.object({
  id: z.string(),
  creatorId: z.string(),
  projectId: z.string(),
  // TODO: add more application fields
});

export type Application = z.infer<typeof ApplicationSchema>;
