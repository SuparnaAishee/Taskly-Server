import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  dueDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format')
    .transform((val) => new Date(val)), // Convert to Date object
  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Priority must be low, medium, or high' }),
  }),
  status: z.enum(['pending', 'in-progress', 'completed']),
});

export const updateTaskSchema = z
  .object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    dueDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format')
      .transform((val) => new Date(val))
      .optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    status: z.enum(['pending', 'in-progress', 'completed']).optional(),
  })
  .partial();
