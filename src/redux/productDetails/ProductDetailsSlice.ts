/** @format */

import {IProduct, TLoading} from "@interfaces/index";
import {createSlice} from "@reduxjs/toolkit";
import getProductDetails from "./thunk/getProductDetails";
import {isString} from "@interfaces/guards";

interface IProductsState {
	ProductDetails: IProduct | null;
	loading: TLoading;
	error: string | null;
}
const initialState: IProductsState = {
	ProductDetails: null,
	loading: "idle",
	error: null,
};

const ProductDetailsSlice = createSlice({
	name: "productDetails",
	initialState,
	reducers: {
		productDetailsCleanUp: (state) => {
			state.ProductDetails = null;
		},
	},
	extraReducers: (builder) => {
		/// get product details

		builder.addCase(getProductDetails.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(getProductDetails.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.ProductDetails = action.payload;
		});
		builder.addCase(getProductDetails.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});
	},
});

export const {productDetailsCleanUp} = ProductDetailsSlice.actions;
export {getProductDetails};
export default ProductDetailsSlice.reducer;
