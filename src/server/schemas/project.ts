import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(['draft','active','archived']).default('draft'),
});

export type Project = z.infer<typeof ProjectSchema>;
