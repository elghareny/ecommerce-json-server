/** @format */

import {addToCart, getProductsByItems} from "@redux/cart/cartSlice";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {productDetailsCleanUp} from "@redux/productDetails/ProductDetailsSlice";
import getProductDetails from "@redux/productDetails/thunk/getProductDetails";
import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const useProductDetails = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const {ProductDetails, loading, error} = useAppSelector(
		(state) => state.productDetails,
	);
	const {productsFullInfo, items} = useAppSelector((state) => state.cart);

	const productsFromCart = productsFullInfo.map((el) => ({
		...el,
		quantity: items[el.id],
	}));
	const productForStock =
		productsFromCart.length > 0
			? productsFromCart.find((el) => el.id === +id!)
			: null;

	const {
		id: productId,
		title,
		description,
		price,
		rating,
		images,
		stock,
		discountPercentage,
		brand,
		meta,
		reviews,
	} = ProductDetails ?? {};

	const [imgIdx, setImgIdx] = useState(0);
	const [quantityValue, setQuantityValue] = useState(0);
	const [isBtnDisabled, setIsBtnDisabled] = useState(false);
	const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false);

	const currentRemainingQuantity =
		(productForStock ? productForStock.stock : stock!) -
		(productForStock?.quantity ?? 0) -
		(quantityValue ?? 0);

	const priceAfterDiscount = (
		price! -
		(price! * discountPercentage!) / 100
	).toFixed(2);

	const onChangeImage = (idx: number) => {
		setImgIdx(idx);
	};

	const changeQuantityHandler = useCallback((isAdd: boolean) => {
		if (isAdd) {
			setQuantityValue((prev) => prev + 1);
		} else setQuantityValue((prev) => prev - 1);
	}, []);

	const addToCartHandler = useCallback(() => {
		dispatch(addToCart({id: productId, quantity: quantityValue}));
		setIsBtnDisabled(true);
		setIsLoadingAddToCart(true);
		dispatch(getProductsByItems())
			.unwrap()
			.then(() => {
				setQuantityValue(0);
			});
	}, [dispatch, productId, quantityValue]);

	useEffect(() => {
		const promise = dispatch(getProductDetails(+id!));
		dispatch(getProductsByItems());
		return () => {
			promise.abort();
			dispatch(productDetailsCleanUp());
		};
	}, [dispatch, id]);

	useEffect(() => {
		if (!isBtnDisabled) return;
		const debounce = setTimeout(() => {
			setIsBtnDisabled(false);
			setIsLoadingAddToCart(false);
		}, 300);
		return () => {
			clearTimeout(debounce);
		};
	}, [isBtnDisabled]);
	return {
		loading,
		error,
		title,
		description,
		price,
		priceAfterDiscount,
		rating,
		images,
		stock,
		discountPercentage,
		brand,
		meta,
		reviews,
		isBtnDisabled,
		imgIdx,
		isLoadingAddToCart,
		currentRemainingQuantity,
		onChangeImage,
		changeQuantityHandler,
		addToCartHandler,
		quantityValue,
	};
};

export default useProductDetails;
