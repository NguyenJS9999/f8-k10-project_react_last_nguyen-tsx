import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import RequiredDotComponent from '../requiredDotComponent/RequiredDotComponent';
import ComponentLoading from '@/components/componentLoading/ComponentLoading';
import ComponentCustomToast from '../componentCustomToast/ComponentCustomToast';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaBrand } from '@/schemas/brandShemas';
import { useEffect } from 'react';
import { productActions } from '@/features/products/productSlice';
import { createBrand } from '@/features/brand/brandActions';

function ComponentBrandForm({ onClose }) {
	const { typeAddOption } = useSelector(state => state.products);
	const { loading, status, error, message } = useSelector(
		state => state.categories
	);

	const dispatch = useDispatch();
	const {
		register: registerBrand,
		formState: { errors: errorsBrand },
		handleSubmit: handleSubmitBrand,
		reset
	} = useForm({
		resolver: zodResolver(schemaBrand),
		defaultValues: {
			title: '',
			image_url: '',
			nation: '',
			description: ''
		}
	});

	function handleBrandForm(dataBody) {
		dispatch(createBrand(dataBody));
		ComponentCustomToast(error || message, status);
	}

	function handleCloseModalActionOption() {
		dispatch(productActions.setShowModalAddOption(false)); // Show modal add option
		reset();
	}

	return (
		<>
			{loading && <ComponentLoading />}
			<form
				onSubmit={handleSubmitBrand(handleBrandForm)}
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
						placeholder="Enter brand title"
						id="title"
						{...registerBrand('title', {
							required: true
						})}
					/>
					{errorsBrand.title && (
						<p className="error-text text-red-500">
							{errorsBrand.title?.message}
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
						placeholder="Enter brand description"
						id="description"
						{...registerBrand('description', {
							required: false
						})}
					/>
					{errorsBrand.description && (
						<p className="error-text text-red-500">
							{errorsBrand.description?.message}
						</p>
					)}
				</div>

				<div className="mb-4">
					<label
						htmlFor="nation"
						className="block text-sm font-medium text-zinc-700 first-letter:uppercase"
					>
						{typeAddOption} nation <RequiredDotComponent />
					</label>
					<input
						className="mt-1 block w-full border border-zinc-300 rounded-md p-2"
						id="nation"
						type="text"
						placeholder="Enter brand nation"
						{...registerBrand('nation', {
							required: true
						})}
					/>
					{errorsBrand.nation && (
						<p className="error-text text-red-500">
							{errorsBrand.nation?.message}
						</p>
					)}
				</div>

				<div className="mb-4">
					<label
						htmlFor="image_url"
						className="block text-sm font-medium text-zinc-700 first-letter:uppercase"
					>
						{typeAddOption} image <RequiredDotComponent />
					</label>
					<input
						className="mt-1 block w-full border border-zinc-300 rounded-md p-2"
						type="text"
						placeholder="Enter brand image_url"
						id="image_url"
						{...registerBrand('image_url', {
							required: true
						})}
					/>
					{errorsBrand.image_url && (
						<p className="error-text text-red-500">
							{errorsBrand.image_url?.message}
						</p>
					)}
				</div>

				<div className="d-flex justify-end gap-1">
					<button
						type="button"
						className="btn btn-secondary"
						onClick={() => handleCloseModalActionOption()}
					>
						Hủy
					</button>
					<button type="submit" className="btn btn-success">
						{`Lưu ${typeAddOption}`}
					</button>
				</div>
			</form>
		</>
	);
}

export default ComponentBrandForm;
