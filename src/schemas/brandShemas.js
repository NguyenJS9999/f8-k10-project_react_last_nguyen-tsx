import * as z from 'zod';

export const schemaBrand = z.object({
	title: z.string().min(1, 'Tên thương hiệu phải có ít nhất 1 ký tự'),
	description: z.string().optional(),
	nation:  z.string().min(1, 'Tên quốc gia phải có ít nhất 1 ký tự'),
	image_url:  z.string().optional(),
});
