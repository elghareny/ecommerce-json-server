/** @format */

import {IProduct} from "@interfaces/index";
import {RootState} from "@redux/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosErrorHandler} from "@utils";
import axios from "axios";

const getProductsByItems = createAsyncThunk(
	"cart/getProductsByItems",
	async (_, thunkAPI) => {
		const {rejectWithValue, fulfillWithValue, getState, signal} = thunkAPI;
		const {cart} = getState() as RootState;
		const itemsID = Object.keys(cart.items);
		if (!itemsID.length) {
			return fulfillWithValue([]);
		}
		try {
			const concatenatedItemsID = itemsID.map((el) => `id=${el}`).join("&");
			const response = await axios.get<IProduct[]>(
				`/products?${concatenatedItemsID}`,
				{signal},
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(axiosErrorHandler(error));
		}
	},
);

export default getProductsByItems;
