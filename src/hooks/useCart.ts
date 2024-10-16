/** @format */

import {
	cartCleanUp,
	cartItemsChangeQuantity,
	cartRemoveItem,
	getProductsByItems,
} from "@redux/cart/cartSlice";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {resetOrderStatus} from "@redux/order/orderSlice";
import {useCallback, useEffect} from "react";
const useCart = () => {
	// STATES
	const dispatch = useAppDispatch();
	const {items, error, loading, productsFullInfo} = useAppSelector(
		(state) => state.cart,
	);
	const placeOrderStatus = useAppSelector((state) => state.order.loading);
	const userAccessToken = useAppSelector((state) => state.auth.accessToken);

	const cartProducts = productsFullInfo.map((el) => ({
		...el,
		quantity: items[el.id],
	}));

	// ACTIONS
	useEffect(() => {
		const promise = dispatch(getProductsByItems());
		return () => {
			promise.abort();
			dispatch(cartCleanUp());
			dispatch(resetOrderStatus());
		};
	}, [dispatch]);

	const changeQuantityHandler = useCallback(
		(id: number, quantity: number, isAdd: boolean) => {
			if (isAdd) {
				dispatch(cartItemsChangeQuantity({id, quantity: quantity + 1}));
			} else dispatch(cartItemsChangeQuantity({id, quantity: quantity - 1}));
		},
		[dispatch],
	);

	const removeCartItemHandler = useCallback(
		(id: number) => {
			dispatch(cartRemoveItem(id));
		},
		[dispatch],
	);
	return {
		error,
		loading,
		cartProducts,
		changeQuantityHandler,
		removeCartItemHandler,
		userAccessToken,
		placeOrderStatus,
	};
};

export default useCart;
