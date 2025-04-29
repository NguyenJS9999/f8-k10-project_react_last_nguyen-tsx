import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import productReducer from "../features/products/productSlice";
import categoryReducer from "@/features/category/categorySlice";
import brandReducer from "@/features/brand/brandSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		products: productReducer,
		categories: categoryReducer,
		brands: brandReducer,
	},
});

export default store;
