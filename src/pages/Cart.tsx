/** @format */

import {CartItemsList, CartSubtotalPrice} from "@components/ecommerce";
import Loading from "@components/feedback/Loading";
import {
	cartItemsChangeQuantity,
	cartRemoveItem,
	getProductsByItems,
} from "@redux/cart/cartSlice";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {useCallback, useEffect} from "react";

const Cart = () => {
	// STATES
	const dispatch = useAppDispatch();
	const {items, error, loading, productsFullInfo} = useAppSelector(
		(state) => state.cart,
	);

	const cartProducts = productsFullInfo.map((el) => ({
		...el,
		quantity: items[el.id],
	}));

	// ACTIONS
	useEffect(() => {
		dispatch(getProductsByItems());
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

	return (
		<div>
			<Loading
				error={error}
				status={loading}>
				<>
					{cartProducts.length ? (
						<CartItemsList
							items={cartProducts}
							changeQuantityHandler={changeQuantityHandler}
							removeCartItemHandler={removeCartItemHandler}
						/>
					) : (
						"Your Cart is empty"
					)}
				</>
			</Loading>
			<CartSubtotalPrice cartProducts={cartProducts} />
		</div>
	);
};

export default Cart;
