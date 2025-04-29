import { addBrand, deleteBrand, getAllBrands, getBrandByid, updateBrand } from '@/services/brandServices';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
	return await getAllBrands();
});

export const fetchBrand = createAsyncThunk('brands/fetchBrand', async () => {
	return await getBrandByid();
});

export const createBrand = createAsyncThunk('brands/createBrand', async brand => {
		return await addBrand(brand);
	}
);

export const editBrand = createAsyncThunk('brands/editBrand', async ({ id, brand }) => {
		return await updateBrand(id, brand);
	}
);

export const removeBrand = createAsyncThunk('brands/removeBrand', async id => {
	await deleteBrand(id);
	return id;
});
