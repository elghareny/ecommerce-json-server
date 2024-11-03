/** @format */

import {createSlice} from "@reduxjs/toolkit";

interface IInitialState {
	isNavModal: boolean;
	isFilterModal: boolean;
}

const initialState: IInitialState = {
	isNavModal: false,
	isFilterModal: false,
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setNavModal: (state) => {
			state.isNavModal = !state.isNavModal;
		},
		setFilterModal: (state) => {
			state.isFilterModal = !state.isFilterModal;
		},
	},
});

export const {setNavModal, setFilterModal} = globalSlice.actions;
export default globalSlice.reducer;
