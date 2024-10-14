/** @format */

import {TLoading} from "@interfaces/index";
import {createSlice} from "@reduxjs/toolkit";
import authRegister from "./thunk/authRegister";
import {isString} from "@interfaces/guards";
import authLogin from "./thunk/authLogin";

interface IAuthState {
	user: {
		id: number;
		firstName: string;
		lastName: string;
		email: string;
	} | null;
	accessToken: string | null;
	loading: TLoading;
	error: string | null;
}

const initialState: IAuthState = {
	user: null,
	accessToken: null,
	loading: "idle",
	error: null,
};
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetUI: (state) => {
			state.error = null;
			state.loading = "idle";
		},
		authLogout: (state) => {
			state.user = null;
			state.accessToken = null;
		},
	},
	extraReducers: (builder) => {
		//register

		builder.addCase(authRegister.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(authRegister.fulfilled, (state) => {
			state.loading = "succeeded";
		});
		builder.addCase(authRegister.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) state.error = action.payload;
		});

		//login

		builder.addCase(authLogin.pending, (state) => {
			state.loading = "pending";
			state.error = null;
		});
		builder.addCase(authLogin.fulfilled, (state, action) => {
			state.loading = "succeeded";
			state.accessToken = action.payload.accessToken;
			state.user = action.payload.user;
		});
		builder.addCase(authLogin.rejected, (state, action) => {
			state.loading = "failed";
			if (isString(action.payload)) state.error = action.payload;
		});
	},
});

export {authRegister, authLogin};
export const {resetUI, authLogout} = authSlice.actions;
export default authSlice.reducer;
