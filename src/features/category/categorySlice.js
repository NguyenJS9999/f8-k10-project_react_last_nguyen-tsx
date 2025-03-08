import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, createCategory, editCategory, removeCategory } from "./categoryActions";

const initialState = {
	categories: [],
	loading: false,
	error: null,
};

const categorySlice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Add
			.addCase(fetchCategories.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = action.payload;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Create
			.addCase(createCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(createCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.categories.push(action.payload);
			})
			.addCase(createCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Update
			.addCase(editCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(editCategory.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.categories.findIndex((category) => category.id === action.payload.id);
				if (index !== -1) {
					state.categories[index] = action.payload;
				}
			})
			.addCase(editCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Delete
			.addCase(removeCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(removeCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = state.categories.filter((category) => category.id !== action.payload);
			})
			.addCase(removeCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

const categoryReducer = categorySlice.reducer;

export default categoryReducer;
