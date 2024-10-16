/** @format */

import {IOrderItem} from "@interfaces/index";
import {createSlice} from "@reduxjs/toolkit";
import placeOrder from "./thunk/placeOrder";
import {isString} from "@interfaces/guards";
import getOrders from "./thunk/getOrders";

interface IOrderState {
	orderList: IOrderItem[];
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
}
const initialState: IOrderState = {
	orderList: [],
	loading: "idle",
	error: null,
};
const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		resetOrderStatus: (state) => {
			state.loading = "idle";
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(placeOrder.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(placeOrder.fulfilled, (state) => {
			state.loading = "succeeded";
		});
		builder.addCase(placeOrder.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});

		// GET ORDERS

		builder.addCase(getOrders.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(getOrders.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.orderList = action.payload;
		});
		builder.addCase(getOrders.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});
	},
});

export {placeOrder, getOrders};
export const {resetOrderStatus} = orderSlice.actions;
export default orderSlice.reducer;
