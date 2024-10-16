/** @format */

import {RootState} from "@redux/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const placeOrder = createAsyncThunk(
	"orders/placeOrder",
	async (subtotal: number, thunkAPI) => {
		const {rejectWithValue, getState} = thunkAPI;
		const {auth, cart} = getState() as RootState;

		const orderItems = cart.productsFullInfo.map((el) => ({
			id: el.id,
			title: el.title,
			price: el.price,
			thumbnail: el.thumbnail,
			quantity: cart.items[el.id],
		}));

		try {
			const response = await axios.post("/orders", {
				userId: auth.user?.id,
				items: orderItems,
				subtotal,
			});

			return response.data;
		} catch (error) {
			return rejectWithValue(axiosErrorHandler(error));
		}
	},
);

export default placeOrder;
