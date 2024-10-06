/** @format */

import {IProduct} from "@interfaces/index";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = IProduct[];

const getProductsBySlug = createAsyncThunk(
	"products/getProductsSlug",
	async (slug: string, thunkAPI) => {
		const {rejectWithValue} = thunkAPI;
		try {
			const response = await axios.get<TResponse>(`/products?category=${slug}`);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data.message || error.message);
			} else {
				return rejectWithValue("An Unknown error");
			}
		}
	},
);

export default getProductsBySlug;
