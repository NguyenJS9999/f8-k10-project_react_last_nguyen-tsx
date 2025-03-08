import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import userReducer from "@/features/user/userSlice";
import categoryReducer from "@/features/category/categorySlice";

const store = configureStore({
	reducer: {
		products: productReducer,
		categories: categoryReducer,
		user: userReducer,
	},
});

export default store;
