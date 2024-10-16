/** @format */

import {IOrderItem} from "@interfaces/index";
import {RootState} from "@redux/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const getOrders = createAsyncThunk("orders/getOrders", async (_, thunkAPI) => {
	const {rejectWithValue, getState, signal} = thunkAPI;
	const {auth} = getState() as RootState;

	try {
		const response = await axios.get<IOrderItem[]>(
			`/orders?userId=${auth.user?.id}`,
			{signal},
		);
		return response.data;
	} catch (error) {
		return rejectWithValue(axiosErrorHandler(error));
	}
});

export default getOrders;
