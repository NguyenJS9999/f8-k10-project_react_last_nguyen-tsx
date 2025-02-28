import * as z from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Email không hợp lệ!'),
	password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự!'),
	// username: z
	// 	.string()
	// 	.min(3, 'Tên người dùng phải có ít nhất 3 ký tự!')
	// 	.max(20, 'Tên người dùng không được quá 20 ký tự!')
	// 	.regex(/^\S*$/, 'Tên người dùng không được chứa khoảng trắng!')
});

export const registerSchema = z.object({
	avatar: z.string().optional(),

	name: z
		.string()
		.min(3, 'Tên phải có ít nhất 3 ký tự!')
		.regex(
			/^[a-zA-ZÀ-ỹ\s]+$/,
			'Tên không được chứa ký tự đặc biệt hoặc số!'
		),

	email: z.string().email('Email không hợp lệ!'),

	password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự!'),

	phone: z
		.string()
		.regex(/^\d{10,15}$/, 'Số điện thoại phải có từ 10 đến 15 chữ số!'),

	address: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự!').optional(),


	age: z
		.number()
		// .int('Tuổi phải là số nguyên!')
		// .min(12, 'Tuổi phải từ 12 trở lên!')
		// .max(100, 'Tuổi không được quá 100!')
		.optional()
});
