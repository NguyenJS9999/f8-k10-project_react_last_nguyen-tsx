import { addCategory, deleteCategory, getAllCategorys, updateCategory } from '@/services/categoryServices';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchCategories = createAsyncThunk(
	'categorys/fetchCategories',
	async () => {
		return await getAllCategorys();
	}
);

export const fetchCategory = createAsyncThunk(
	'categorys/fetchCategory',
	async () => {
		return await getCategoryById();
	}
);


export const createCategory = createAsyncThunk(
	'categorys/createCategory',
	async category => {
		return await addCategory(category);
	}
);

export const editCategory = createAsyncThunk(
	'categorys/editCategory',
	async ({ id, category }) => {
		return await updateCategory(id, category);
	}
);

export const removeCategory = createAsyncThunk(
	'categorys/removeCategory',
	async id => {
		await deleteCategory(id);
		return id;
	}
);
