import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import RequiredDotComponent from '../requiredDotComponent/RequiredDotComponent';
import ComponentLoading from '@/components/componentLoading/ComponentLoading';
import ComponentCustomToast from '../componentCustomToast/ComponentCustomToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaCategory } from '@/schemas/categoryShemas';
import { useEffect } from 'react';
import { productActions } from '@/features/products/productSlice';
import { createCategory } from '@/features/category/categoryActions';

function ComponentCategoryForm() {
	const { typeAddOption, countResetForm } = useSelector(state => state.products);
	const { loading, status, error, message } = useSelector(
		state => state.categories
	);

	const dispatch = useDispatch();
	const {
		register: registerCategory,
		formState: { errors: errorsCategory },
		handleSubmit: handleSubmitCategory,
		reset,
	} = useForm({
		resolver: zodResolver(schemaCategory),
		defaultValues: { title: '', description: '' }
	});

	function handleCategoryForm(dataBody) {
		dispatch(createCategory(dataBody))
	}

	function handleResetCategoryForm() {
		reset();
	}

	useEffect(() => {
		reset();
		console.log('reset category: ',);

	}, [countResetForm, reset]);

	return (
		<>
			{loading && <ComponentLoading />}
			<form
				onSubmit={handleSubmitCategory(handleCategoryForm)}
				// className="product-form"
			>
				<div className="mb-4">
					<label
						htmlFor="title"
						className="block text-sm font-medium text-zinc-700 first-letter:uppercase"
					>
						{typeAddOption} title <RequiredDotComponent />
					</label>
					<input
						className="mt-1 block w-full border border-zinc-300 rounded-md p-2"
						type="text"
						placeholder="Enter category title"
						id="title"
						{...registerCategory('title', {
							required: true
						})}
					/>
					{errorsCategory.title && (
						<p className="error-text text-red-500">
							{' '}
							{errorsCategory.title?.message}{' '}
						</p>
					)}
				</div>

				<div className="mb-4">
					<label
						htmlFor="description"
						className="block text-sm font-medium text-zinc-700 first-letter:uppercase"
					>
						{typeAddOption} description
					</label>
					<input
						className="mt-1 block w-full border border-zinc-300 rounded-md p-2"
						type="text"
						placeholder="Enter category description"
						id="description"
						{...registerCategory('description', {
							required: false
						})}
					/>
					{errorsCategory.description && (
						<p className="error-text text-red-500">
							{errorsCategory.description?.message}
						</p>
					)}
				</div>

				<div className="d-flex justify-end gap-1">
					<button
						type="button"
						className="btn btn-secondary"
						onClick={() => handleResetCategoryForm()}
					>
						Nhập lại
					</button>

					<button type="submit" className="btn btn-success">
						{`Lưu ${typeAddOption}`}
					</button>
				</div>
			</form>
		</>
	);
}

export default ComponentCategoryForm;
