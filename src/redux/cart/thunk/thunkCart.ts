/** @format */

import {IProduct} from "@interfaces/index";
import {RootState} from "@redux/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const getProductsByItems = createAsyncThunk(
	"cart/getProductsByItems",
	async (_, thunkAPI) => {
		const {rejectWithValue, fulfillWithValue, getState} = thunkAPI;
		const {cart} = getState() as RootState;
		const itemsID = Object.keys(cart.items);
		if (!itemsID.length) {
			return fulfillWithValue([]);
		}
		try {
			const concatenatedItemsID = itemsID.map((el) => `id=${el}`).join("&");
			const response = await axios.get<IProduct[]>(
				`/products?${concatenatedItemsID}`,
			);
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

export default getProductsByItems;
