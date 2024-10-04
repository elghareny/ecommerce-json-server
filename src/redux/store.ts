/** @format */
import {configureStore} from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import products from "./products/productSlice";

export const store = configureStore({
	reducer: {
		categories,
		products,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
