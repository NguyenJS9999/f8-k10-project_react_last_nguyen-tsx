import * as z from 'zod';

export const schemaProduct = z.object({
	// 	url: z.string().url({ message: 'Url không hợp lệ' }),
	// 	title: z
	// 		.string()
	// 		.trim()
	// 		.min(1, { message: 'Tên sản phẩm cần tối thiểu 1 ký tự' }),
	//
	// 	price: z
	// 		.number()
	// 		.positive({ message: 'Giá phải là số dương' })
	// 		.refine(value => value === value && !isNaN(value), {
	// 			// Kiểm tra để loại bỏ NaN
	// 			message: 'Giá không hợp lệ'
	// 		}),
	//
	// 	description: z.string().trim().optional(),
	// 	categoryId: z.string().trim().min(1,{ message: 'Danh mục không hợp lệ' }),

	title: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
	price_default: z.number().positive('Giá sản phẩm phải là số dương'),
	categoryId: z.string().min(1, 'Vui lòng chọn danh mục'),
	
	brandId: z.string().min(1, 'Vui lòng chọn thương hiệu'),
	description: z.string().optional(),
	image_url: z
	.string()
	// .url('URL ảnh không hợp lệ')
	.optional(),
	stock_default: z.number().int().positive('Số lượng tồn kho phải lớn hơn 0'),
	rate: z.number().min(0).max(5).default(0).optional(),
	isHidden: z.boolean().default(false),
	attributes: z
		.array(
			z.object({
				attributeId: z.string().min(1, 'Chọn thuộc tính'),
				values: z
					.array(z.string().min(1, 'Chọn giá trị'))
					.nonempty('Ít nhất một giá trị')
			})
		)
		.optional()
});
// valueAsNumber Không Hợp Lệ với z.number() nếu price_default rỗng, nó sẽ gửi NaN, làm validation thất bại
//  cần thêm nếu có biến thể thì price_default ko bắt buộc
