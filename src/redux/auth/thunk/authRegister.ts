/** @format */

import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

/** @format */

type TFormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};
const authRegister = createAsyncThunk(
	"auth/authRegister",
	async (formData: TFormData, thunkAPI) => {
		const {rejectWithValue} = thunkAPI;
		try {
			const response = await axios.post("/register", formData);
			return response.data;
		} catch (error) {
			return rejectWithValue(axiosErrorHandler(error));
		}
	},
);

export default authRegister;