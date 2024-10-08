/** @format */

import {IProduct} from "@interfaces/index";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosErrorHandler} from "@utils";
import axios from "axios";

type TResponse = IProduct[];

const getProductsBySlug = createAsyncThunk(
	"products/getProductsSlug",
	async (slug: string, thunkAPI) => {
		const {rejectWithValue, signal} = thunkAPI;
		try {
			const response = await axios.get<TResponse>(
				`/products?category=${slug}`,
				{signal},
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(axiosErrorHandler(error));
		}
	},
);

export default getProductsBySlug;
