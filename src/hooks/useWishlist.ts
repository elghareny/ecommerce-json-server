/** @format */

import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {getWishlistItems, wishlistCleanUp} from "@redux/wishlist/wishlistSlice";
import {useEffect} from "react";
const useWishlist = () => {
	// STATES
	const dispatch = useAppDispatch();
	const {loading, error, records} = useAppSelector((state) => state.wishlist);
	const cartItems = useAppSelector((state) => state.cart.items);

	const productsFullInfo = records.map((record) => ({
		...record,
		quantity: cartItems[record.id],
		isLiked: true,
	}));

	// ACTIONS
	useEffect(() => {
		const promise = dispatch(getWishlistItems());
		return () => {
			promise.abort();
			dispatch(wishlistCleanUp());
		};
	}, [dispatch]);
	return {loading, error, productsFullInfo};
};

export default useWishlist;
