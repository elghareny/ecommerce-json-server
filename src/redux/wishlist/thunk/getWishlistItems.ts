/** @format */

import {IProduct} from "@interfaces/index";
import {RootState} from "@redux/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosErrorHandler} from "@utils";
import axios from "axios";

type TDataType = "productsFullInfo" | "productsIds";
const getWishlistItems = createAsyncThunk(
	"wishlist/getWishlistItems",
	async (dataType: TDataType, thunkAPI) => {
		const {rejectWithValue, signal, getState} = thunkAPI;
		const {auth} = getState() as RootState;
		try {
			const userWishlist = await axios.get<{productId: number}[]>(
				`/wishlist?userId=${auth.user?.id}`,
				{signal},
			);
			if (!userWishlist.data.length) {
				return {data: [], dataType: "empty"};
			}
			if (dataType === "productsIds") {
				const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
				return {data: concatenatedItemsId, dataType: "productsIds"};
			} else {
				const concatenatedItemsId = userWishlist.data
					.map((el) => `id=${el.productId}`)
					.join("&");

				const response = await axios.get<IProduct[]>(
					`products?${concatenatedItemsId}`,
					{signal},
				);
				return {data: response.data, dataType: "productsFullInfo"};
			}
		} catch (error) {
			return rejectWithValue(axiosErrorHandler(error));
		}
	},
);

export default getWishlistItems;
