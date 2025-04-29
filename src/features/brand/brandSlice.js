import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands, createBrand, editBrand, removeBrand } from "./brandActions";

const initialState = {
	brands: [],
	loading: false,
	error: null,
	message: "",
	status: "success",
};

const brandSlice = createSlice({
	name: "brands",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Get all brand
			.addCase(fetchBrands.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchBrands.fulfilled, (state, action) => {
				state.loading = false;
				state.brands = action.payload;
			})
			.addCase(fetchBrands.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = "error"
			})
			// Add
			.addCase(createBrand.pending, (state) => {
				state.loading = true;
			})
			.addCase(createBrand.fulfilled, (state, action) => {
				state.loading = false;
				state.brands.push(action.payload);
				console.log("createBrand : ", action.payload)
				state.message = "Thêm thương hiệu thành công";
				state.status = "success";
			})
			.addCase(createBrand.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.message = "Thêm thương hiệu thất bại";
				state.status = "error"
			})
			// Update
			.addCase(editBrand.pending, (state) => {
				state.loading = true;
			})
			.addCase(editBrand.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.brands.findIndex((brand) => brand.id === action.payload.id);
				if (index !== -1) {
					state.brands[index] = action.payload;
				}
				state.message = "Cập nhập thương hiệu thành công"
				state.status = "success";
			})
			.addCase(editBrand.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.message = "Cập nhập thương hiệu thất bại";
				state.status = "error";
			})
			// Delete
			.addCase(removeBrand.pending, (state) => {
				state.loading = true;
			})
			.addCase(removeBrand.fulfilled, (state, action) => {
				state.loading = false;
				state.brands = state.brands.filter((brand) => brand.id !== action.payload);
				state.message = "Xóa thương hiệu thành công"
				state.status = "success";
			})
			.addCase(removeBrand.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.message = "Xóa thương hiệu thất bại";
				state.status = "error";
			});
	},
});

const brandReducer = brandSlice.reducer;

export default brandReducer;
