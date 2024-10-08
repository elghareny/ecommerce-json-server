/** @format */

import {ICategory} from "@interfaces/index";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosErrorHandler} from "@utils";
import axios from "axios";

type TResponse = ICategory[];
const getCategories = createAsyncThunk(
	"categories/getCategories",
	async (_, thunkAPI) => {
		const {rejectWithValue, signal} = thunkAPI;
		try {
			const response = await axios.get<TResponse>("/categories", {signal});
			return response.data;
		} catch (error) {
			return rejectWithValue(axiosErrorHandler(error));
		}
	},
);

export default getCategories;
