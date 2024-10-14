/** @format */

import {TLoginFormInputs} from "@interfaces/index";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TResponse = {
	accessToken: string;
	user: {
		id: number;
		firstName: string;
		lastName: string;
		email: string;
	};
};
const authLogin = createAsyncThunk(
	"auth/authLogin",
	async (formData: TLoginFormInputs, thunkAPI) => {
		const {rejectWithValue} = thunkAPI;
		try {
			const response = await axios.post<TResponse>("/login", formData);
			return response.data;
		} catch (error) {
			return rejectWithValue(axiosErrorHandler(error));
		}
	},
);
export default authLogin;
