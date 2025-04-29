import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, createProduct, editProduct, removeProduct } from "./productActions";

const initialState = {
	products: [],
	loading: false,
	error: null,
	message: "",
	status: "success",
	typeAddOption: "",
	showModalAddOption: false,
	countResetForm: 0,
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setTypeAddOption: (state, action) => {
			state.typeAddOption = action.payload; // String
		},
		setShowModalAddOption: (state, action) => {
			state.showModalAddOption = action.payload;
		},
		handleResetFormRedux: (state, action) => {
			console.log("setShowModalAddOption action: ", action)
			state.countResetForm += action.payload; // String
		}
	},
	extraReducers: (builder) => {
		builder
			// Get all product
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = "error"
			})
			// Add
			.addCase(createProduct.pending, (state) => {
				state.loading = true;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products.push(action.payload);
				console.log("createProduct : ", action.payload)
				state.message = "Thêm sản phẩm thành công";
				state.status = "success";
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.message = "Thêm sản phẩm thất bại";
				state.status = "error"
			})
			// Update
			.addCase(editProduct.pending, (state) => {
				state.loading = true;
			})
			.addCase(editProduct.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.products.findIndex((product) => product.id === action.payload.id);
				if (index !== -1) {
					state.products[index] = action.payload;
				}
				state.message = "Cập nhập sản phẩm thành công"
				state.status = "success";
			})
			.addCase(editProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.message = "Cập nhập sản phẩm thất bại";
				state.status = "error";
			})
			// Delete
			.addCase(removeProduct.pending, (state) => {
				state.loading = true;
			})
			.addCase(removeProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products = state.products.filter((product) => product.id !== action.payload);
				state.message = "Xóa sản phẩm thành công"
				state.status = "success";
			})
			.addCase(removeProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.message = "Xóa sản phẩm thất bại";
				state.status = "error";
			});
	},
});

// Xuất reducers từ `reducers {}` ra để sử dụng trong component
export const productActions = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;
