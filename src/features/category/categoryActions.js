import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	addProduct,
	deleteProduct,
	getAllProducts,
	getOneProduct,
	updateProduct
} from '../../services/productServices';

// Hàm xử lý lỗi chung để dùng với `rejectWithValue`
const handleThunkRequest = async (callback, rejectWithValue) => {
	try {
		return await callback();
	} catch (error) {
		return rejectWithValue(error); // Trả về lỗi có thể xử lý trong reducer
	}
};

export const fetchProducts1 = createAsyncThunk(
	'products/fetchProducts',
	async params => {
		return await getAllProducts(params);
	}
);
// Lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async (params, { rejectWithValue }) =>
		handleThunkRequest(() => getAllProducts(params), rejectWithValue)
);

// Lấy một sản phẩm theo ID
export const fetchProductById = createAsyncThunk(
	'products/fetchProductById',
	async (id, { rejectWithValue }) =>
		handleThunkRequest(() => getOneProduct(id), rejectWithValue)
);

// Thêm sản phẩm mới
export const createProduct = createAsyncThunk(
	'products/createProduct',
	async (product, { rejectWithValue }) =>
		handleThunkRequest(() => addProduct(product), rejectWithValue)
);

// Cập nhật sản phẩm
export const editProduct = createAsyncThunk(
	'products/editProduct',
	async ({ id, product }, { rejectWithValue }) =>
		handleThunkRequest(() => updateProduct(id, product), rejectWithValue)
);

// Xóa sản phẩm
export const removeProduct = createAsyncThunk(
	'products/removeProduct',
	async (id, { rejectWithValue }) =>
		handleThunkRequest(() => deleteProduct(id), rejectWithValue)
);
