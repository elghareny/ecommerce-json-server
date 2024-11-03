/** @format */

import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const getAllProducts = createAsyncThunk(
	"products/getAllProducts",
	async (_, thunkAPI) => {
		const {rejectWithValue, signal} = thunkAPI;
		try {
			const response = await axios.get("/products", {signal});
			return response.data;
		} catch (error) {
			rejectWithValue(axiosErrorHandler(error));
		}
	},
);

export default getAllProducts;
