/** @format */

import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {getProductsBySlug, productsCleanUp} from "@redux/products/productSlice";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

const useProducts = () => {
	// STATES
	const params = useParams();
	const dispatch = useAppDispatch();
	const {error, loading, records} = useAppSelector((state) => state.products);

	const cartItems = useAppSelector((state) => state.cart.items);
	const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsID);

	const productsFullInfo = records.map((el) => ({
		...el,
		quantity: cartItems[el.id] as number,
		isLiked: wishlistItemsId.includes(el.id),
	}));

	// ACTIONS

	useEffect(() => {
		const promise = dispatch(getProductsBySlug(params.slug as string));
		return () => {
			promise.abort();
			dispatch(productsCleanUp());
		};
	}, [dispatch, params]);

	// RENDERS
	return {loading, error, productsFullInfo, params};
};

export default useProducts;
