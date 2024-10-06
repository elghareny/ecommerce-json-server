/** @format */

import {ICategory} from "@interfaces/index";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = ICategory[];
const getCategories = createAsyncThunk(
	"categories/getCategories",
	async (_, thunkAPI) => {
		const {rejectWithValue} = thunkAPI;
		try {
			const response = await axios.get<TResponse>("/categories");
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

export default getCategories;
