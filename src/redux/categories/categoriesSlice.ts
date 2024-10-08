/** @format */

import {createSlice} from "@reduxjs/toolkit";
import getCategories from "./thunk/thumkCategories";
import {ICategory, TLoading} from "@interfaces/index";
import {isString} from "@interfaces/guards";

interface ICategoriesState {
	records: ICategory[];
	loading: TLoading;
	error: string | null;
}
const initialState: ICategoriesState = {
	records: [],
	loading: "idle",
	error: null,
};

const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		categoriesCleanUp: (state) => {
			state.records = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCategories.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(getCategories.fulfilled, (state, action) => {
			state.loading = "succeeded";
			if (action.payload && Array.isArray(action.payload)) {
				state.records = action.payload;
			}
		});
		builder.addCase(getCategories.rejected, (state, action) => {
			state.loading = "failed";
			console.log(action.payload);
			if (isString(action.payload)) {
				state.error = action.payload;
			}
		});
	},
});

export {getCategories};
export const {categoriesCleanUp} = categoriesSlice.actions;
export default categoriesSlice.reducer;
