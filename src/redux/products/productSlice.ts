/** @format */

import {createSlice} from "@reduxjs/toolkit";
import {IProduct, TLoading} from "@interfaces/index";
import getProductsBySlug from "./thunk/thunkProducts";
import {isString} from "@interfaces/guards";
import getAllProducts from "./thunk/getAllProducts";

interface IProductsState {
	records: IProduct[];
	loading: TLoading;
	error: string | null;
}
const initialState: IProductsState = {
	records: [],
	loading: "idle",
	error: null,
};

const ProductsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		productsCleanUp: (state) => {
			state.records = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProductsBySlug.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(getProductsBySlug.fulfilled, (state, action) => {
			state.loading = "succeeded";
			if (action.payload && Array.isArray(action.payload)) {
				state.records = action.payload;
			}
		});
		builder.addCase(getProductsBySlug.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});

		// get All products

		builder.addCase(getAllProducts.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(getAllProducts.fulfilled, (state, action) => {
			state.loading = "succeeded";
			if (action.payload && Array.isArray(action.payload)) {
				state.records = action.payload;
			}
		});
		builder.addCase(getAllProducts.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});
	},
});

export const {productsCleanUp} = ProductsSlice.actions;

export {getProductsBySlug, getAllProducts};
export default ProductsSlice.reducer;
