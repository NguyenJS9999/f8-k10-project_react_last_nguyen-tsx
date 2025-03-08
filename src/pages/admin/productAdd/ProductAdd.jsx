import { fetchCategories } from '@/features/category/categoryActions';
import { createProduct } from '@/features/products/productActions';
import { schemaProduct } from '@/schemas/productShemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';


function ProductAdd() {
	const dispatch = useDispatch();

	const { products } = useSelector( state => state.products );
	const { categories } = useSelector( state => state.categories );


	const {
		register,
		formState: { errors },
		handleSubmit,
		// reset,
	} = useForm({
		resolver : zodResolver(schemaProduct),
		defaultValues: {
			title: '',
			price_default: undefined, // Không dùng null
			categoryId: '',
			description: '',
			image_url: '',
			stock_default: undefined  // Không dùng null
		}
	});

	useEffect(() => { // Lấy category
		dispatch(fetchCategories());
	}, [dispatch]);


	function handleProductForm(dataBody) {
		console.log('handleProductForm dataBody: ', dataBody);
		dispatch(createProduct(dataBody));
	}

	useEffect(() => {
		console.log('handleProductForm errors: ', errors);
		console.log('handleProductForm products: ', products);
		console.log('handleProductForm categories: ', categories);

	}, [errors, products, categories]);

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-semibold mb-4">Add Product</h1>

			<form
				onSubmit={handleSubmit(handleProductForm)}
				className="product-form"
			>
				{/* submit buttons */}
				<div className="flex justify-end mb-6 gap-2">
					<button className="bg-zinc-300 text-zinc-700 px-4 py-2 rounded-md mr-2">
						Cancel
					</button>
					<button type='submit' className="bg-green-500 text-white px-4 py-2 rounded-md">
						Add Product
					</button>
				</div>
				{/*  */}
				<div className="grid grid-cols-1 md:grid-cols-1 gap-6"> {/* md:grid-cols-2 */}
					<div className="bg-white shadow-md rounded-lg p-4">
						{/* Product input title */}
						<h2
							htmlFor="title"
							className="text-lg font-semibold mb-4"
						>
							Product title
						</h2>
						<div className="mb-4">
							<label className="block text-sm font-medium text-zinc-700">
								Product Name *
							</label>
							<input
								className="mt-1 block w-full border border-zinc-300 rounded-md p-2"
								type="text"
								placeholder="Enter Product Name"
								id="title"
								{...register('title', { required: true })}
							/>
						{errors.title && <p className="error-text text-red-500">{errors.title.message}</p>}

						</div>
						{/* Product input Category categoryId */}
						<div className="mb-4">
							<label
								htmlFor="category"
								className="block text-sm font-medium text-zinc-700"
							>
								Product Category *
							</label>
							<select
								className="mt-1 block w-full border border-zinc-300 rounded-md p-2"
								id="categoryId"
								{...register("categoryId", { required: true })}
							>
							{ Array.isArray(categories) && categories && categories.map((category) => (
								<option key={category._id} value={category._id}>
									{category.title}
								</option>
							))}
							</select>
						{errors.categoryId && ( <p className="error-text text-red-500"> {errors.categoryId?.message} </p> )}
						</div>
						{/* Product input Price */}
						<div className="mb-4">
							<label
								htmlFor="price_default"
								className="block text-sm font-medium text-zinc-700"
							>
								Product Price *
							</label>
							<input
								className="mt-1 block w-full border border-zinc-300 rounded-md p-2"
								type="number"
								placeholder="Enter Product Price"
								id="price_default"
								step="any"
								{...register('price_default', {
									required: true,
									valueAsNumber: true
								})}
							/>
							{errors.price_default && ( <p className="error-text text-red-500"> {errors.price_default?.message} </p> )}
						</div>
						{/* Product input stock*/}
						<div className="mb-4">
							<label
								htmlFor="stock_default"
								className="block text-sm font-medium text-zinc-700"
							>
								Product stock default *
							</label>
							<input
								className="mt-1 block w-full border border-zinc-300 rounded-md p-2"
								placeholder="Enter Product Description"
								id="stock_default"
								{...register('stock_default', { required: true, valueAsNumber: true })}
							></input>
							{errors.stock_default && ( <p className="error-text text-red-500"> {errors.stock_default?.message} </p> )}
						</div>
						{/* Product input Description */}
						<div className="mb-4">
							<label
								htmlFor="description"
								className="block text-sm font-medium text-zinc-700"
							>
								Product Description *
							</label>
							<textarea
								className="mt-1 block w-full border border-zinc-300 rounded-md p-2 h-24"
								placeholder="Enter Product Description"
								id="description"
								cols="50"
								{...register('description', {
									required: false
								})}
							></textarea>
						</div>

					</div>
					{/* Meta data */}
					{/* <div className="bg-white shadow-md rounded-lg p-4">
						<h2 className="text-lg font-semibold mb-4">
							Meta Data
						</h2>
						<div className="mb-4">
							<label className="block text-sm font-medium text-zinc-700">
								Meta Title *
							</label>
							<input
								type="text"
								placeholder="Enter Meta Title"
								className="mt-1 block w-full border border-zinc-300 rounded-md p-2"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-zinc-700">
								Meta Name *
							</label>
							<input
								type="text"
								placeholder="Enter Meta Name"
								className="mt-1 block w-full border border-zinc-300 rounded-md p-2"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-zinc-700">
								Meta Tags
							</label>
							<input
								type="text"
								placeholder="Enter Meta Tags"
								className="mt-1 block w-full border border-zinc-300 rounded-md p-2"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-zinc-700">
								Meta Description *
							</label>
							<textarea
								placeholder="Enter Meta Description"
								className="mt-1 block w-full border border-zinc-300 rounded-md p-2 h-24"
							></textarea>
						</div>
					</div> */}
				</div>
				{/* Product input Images */}
				<div className="bg-white shadow-md rounded-lg p-4 mt-6">
					<div className="mb-4">
						<label
							htmlFor="image_url"
							className="block text-sm font-medium text-zinc-700"
						>
							Product Images
						</label>
						<input
							className="mt-1 block w-full border border-zinc-300 rounded-md p-2"
							type="text"
							placeholder="Enter Product image url"
							id="image_url"
							{...register('image_url', { required: false })}
						/>
						{errors.image_url && (
							<p className="error-text text-red-500">
								{errors.image_url?.message}
							</p>
						)}
					</div>
				</div>

				<div className="bg-white shadow-md rounded-lg p-4 mt-6">
					<h2 className="text-lg font-semibold mb-4">
						Product Images
					</h2>
					<div className="border-2 border-dashed border-zinc-300 rounded-lg p-4 text-center">
						<p className="text-zinc-500">
							Drop files here or click to upload.
						</p>
						<p className="text-sm text-zinc-400">
							(This is just a demo dropzone. Selected files are
							not actually uploaded.)
						</p>
					</div>
				</div>
				{/* submit buttons */}
				<div className="flex justify-end mt-6 gap-2">
					<button className="bg-zinc-300 text-zinc-700 px-4 py-2 rounded-md mr-2">
						Cancel
					</button>
					<button type='submit' className="bg-green-500 text-white px-4 py-2 rounded-md">
						Add Product
					</button>
				</div>
				{/*  */}
			</form>
			{/*  */}
		</div>
	);
}

export default ProductAdd;
