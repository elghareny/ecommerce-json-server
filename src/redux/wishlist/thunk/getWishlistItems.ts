/** @format */

import {IProduct} from "@interfaces/index";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosErrorHandler} from "@utils";
import axios from "axios";

const getWishlistItems = createAsyncThunk(
	"wishlist/getWishlistItems",
	async (_, thunkAPI) => {
		const {rejectWithValue, fulfillWithValue, signal} = thunkAPI;
		try {
			const userWishlist = await axios.get<{productId: number}[]>(
				`/wishlist?userId=1`,
				{signal},
			);
			if (!userWishlist.data.length) {
				return fulfillWithValue([]);
			}
			const concatenatedItemsId = userWishlist.data
				.map((el) => `id=${el.productId}`)
				.join("&");

			const response = await axios.get<IProduct[]>(
				`products?${concatenatedItemsId}`,
				{signal},
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(axiosErrorHandler(error));
		}
	},
);

export default getWishlistItems;
