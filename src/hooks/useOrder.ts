/** @format */

import {IProduct} from "@interfaces/index";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {getOrders, resetOrderStatus} from "@redux/order/orderSlice";
import {useEffect, useState} from "react";

const useOrder = () => {
	const dispatch = useAppDispatch();
	const {orderList, error, loading} = useAppSelector((state) => state.order);
	const [isShowModal, setIsShowModal] = useState(false);
	const [SelectedOrders, setSelectedOrders] = useState<IProduct[]>([]);

	const modalHandler = () => {
		setIsShowModal(false);
		setSelectedOrders([]);
	};

	const selectOrderHandler = (id: number) => {
		const orderSelected = orderList?.find((order) => order.id === id);
		const newItems = orderSelected?.items ?? [];
		setIsShowModal(true);
		setSelectedOrders((prev) => [...prev, ...newItems]);
	};

	useEffect(() => {
		dispatch(getOrders());
		return () => {
			dispatch(getOrders()).abort();
			dispatch(resetOrderStatus());
		};
	}, [dispatch]);
	return {
		orderList,
		error,
		loading,
		isShowModal,
		SelectedOrders,
		modalHandler,
		selectOrderHandler,
	};
};

export default useOrder;
