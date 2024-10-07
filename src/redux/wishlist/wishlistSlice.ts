/** @format */

import {createSlice} from "@reduxjs/toolkit";
import likeToggle from "./thunk/likeToggle";
import getWishlistItems from "./thunk/getWishlistItems";
import {IProduct, TLoading} from "@interfaces/index";

interface wishlistState {
	itemsID: number[];
	records: IProduct[];
	loading: TLoading;
	error: null | string;
}

const initialState: wishlistState = {
	itemsID: [],
	records: [],
	loading: "idle",
	error: null,
};

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		wishlistCleanUp: (state) => {
			state.records = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(likeToggle.pending, (state) => {
			state.error = null;
		});
		builder.addCase(likeToggle.fulfilled, (state, action) => {
			if (action.payload.type === "add") {
				state.itemsID.push(action.payload.id);
			} else {
				state.itemsID = state.itemsID.filter((el) => el !== action.payload.id);
				state.records = state.records.filter(
					(el) => el.id !== action.payload.id,
				);
			}
		});
		builder.addCase(likeToggle.rejected, (state, action) => {
			if (action.payload && typeof action.payload === "string")
				state.error = action.payload;
		});

		// wishlist items

		builder.addCase(getWishlistItems.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(getWishlistItems.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.records = action.payload;
		});
		builder.addCase(getWishlistItems.rejected, (state, action) => {
			state.loading = "failed";
			if (action.payload && typeof action.payload === "string")
				state.error = action.payload;
		});
	},
});

export {likeToggle, getWishlistItems};

export const {wishlistCleanUp} = wishlistSlice.actions;
export default wishlistSlice.reducer;
