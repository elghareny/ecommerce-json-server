/** @format */

import {IProduct, TLoading} from "@interfaces/index";
import {createSlice} from "@reduxjs/toolkit";
import {getCartTotalQuantitySelector} from "./selectors";
import getProductsByItems from "./thunk/thunkCart";
import {isString} from "@interfaces/guards";

interface ICartState {
	items: {[key: string]: number};
	productsFullInfo: IProduct[];
	loading: TLoading;
	error: null | string;
}
const initialState: ICartState = {
	items: {},
	productsFullInfo: [],
	loading: "idle",
	error: null,
};
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const id = action.payload.id;
			const quantity = action.payload.quantity;
			if (state.items[id]) {
				state.items[id] += quantity;
			} else {
				state.items[id] = quantity;
			}
		},
		cartItemsChangeQuantity: (state, action) => {
			state.items[action.payload.id] = action.payload.quantity;
		},
		cartRemoveItem: (state, action) => {
			delete state.items[action.payload];
			state.productsFullInfo = state.productsFullInfo.filter(
				(el) => el.id !== action.payload,
			);
		},
		cartCleanUp: (state) => {
			state.productsFullInfo = [];
		},
		clearCartAfterPlaceOrder: (state) => {
			state.items = {};
			state.productsFullInfo = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProductsByItems.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(getProductsByItems.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.productsFullInfo = action.payload;
		});
		builder.addCase(getProductsByItems.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});
	},
});
export {getCartTotalQuantitySelector, getProductsByItems};
export const {
	addToCart,
	cartItemsChangeQuantity,
	cartRemoveItem,
	cartCleanUp,
	clearCartAfterPlaceOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
