/** @format */

import {IProduct} from "@interfaces/index";
import {addToCart} from "@redux/cart/cartSlice";
import {useAppDispatch} from "@redux/hooks";
import {memo, useEffect, useState} from "react";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import {likeToggle} from "@redux/wishlist/wishlistSlice";

interface IProps {
	product: IProduct;
}
const Product = memo(({product}: IProps) => {
	const {id, title, price, thumbnail, stock, quantity, isLiked} = product;
	// STATES
	const [isBtnDisabled, setIsBtnDisabled] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();

	const currentRemainingQuantity = stock - (quantity ?? 0);
	const quantityReachedToMax = currentRemainingQuantity > 0 ? false : true;

	// HANDLER

	useEffect(() => {
		if (!isBtnDisabled) return;
		const debounce = setTimeout(() => {
			setIsBtnDisabled(false);
		}, 300);

		return () => {
			clearTimeout(debounce);
		};
	}, [isBtnDisabled]);

	const addToCartHandler = () => {
		dispatch(addToCart(id));
		setIsBtnDisabled(true);
	};

	const likeToggleHandler = () => {
		if (!isLoading) {
			setIsLoading(true);
			dispatch(likeToggle(id))
				.unwrap()
				.then(() => setIsLoading(false))
				.catch(() => setIsLoading(false));
		}
	};
	return (
		<div className='relative w-[160px] flex flex-col justify-between  border-2 border-gray-300 p-2 rounded-lg'>
			<button
				className='absolute -top-3 -right-3 bg-white w-fit p-3 rounded-full flex items-center justify-center duration-300 hover:drop-shadow-[0_10px_20px_rgba(255,0,0,.4)]'
				onClick={likeToggleHandler}>
				{isLoading ? (
					"loading"
				) : isLiked ? (
					<LikeFill
						width={26}
						hanging={26}
					/>
				) : (
					<Like
						width={26}
						hanging={26}
					/>
				)}
			</button>
			<div className='h-[180px] rounded-lg'>
				<img
					loading='lazy'
					className='w-full h-full bg-[#f2f2f2] block object-cover rounded-lg'
					src={thumbnail}
					alt={title}
				/>
			</div>
			<h2 className='text-base font-semibold  w-full overflow-hidden text-ellipsis'>
				{title}
			</h2>
			<h3 className='text-base font-semibold'>{price.toFixed(2)} EGP</h3>
			<p className='text-base font-semibold text-gray-600'>
				stock : {currentRemainingQuantity}
			</p>
			<button
				disabled={isBtnDisabled || quantityReachedToMax}
				className={``}
				onClick={addToCartHandler}>
				{isBtnDisabled ? (
					<svg
						className='animate-spin h-5 w-5 mr-3 ...'
						viewBox='0 0 24 24'>
						{" "}
						loading...
					</svg>
				) : (
					"Add to cart"
				)}
			</button>
		</div>
	);
});

export default Product;
