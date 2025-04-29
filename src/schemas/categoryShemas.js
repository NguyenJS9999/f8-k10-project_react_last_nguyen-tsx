import * as z from 'zod';

export const schemaCategory = z.object({
	title: z.string().min(1, 'Tiêu đề phải có ít nhất 1 ký tự'),
	description: z.string().optional(),
});
