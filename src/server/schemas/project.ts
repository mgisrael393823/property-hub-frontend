import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  // TODO: add more project fields
});

export type Project = z.infer<typeof ProjectSchema>;
