/** @format */

import {IProduct} from "@interfaces/index";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const getProductDetails = createAsyncThunk(
	"productDetails/getProductDetails",
	async (id: number, thunkAPI) => {
		const {rejectWithValue, signal} = thunkAPI;
		try {
			const response = await axios.get<IProduct>(`/products/${id}`, {signal});
			return response.data;
		} catch (error) {
			return rejectWithValue(axiosErrorHandler(error));
		}
	},
);

export default getProductDetails;
