/** @format */

import {IProduct} from "@interfaces/index";
import {addToCart} from "@redux/cart/cartSlice";
import {useAppDispatch} from "@redux/hooks";
import {memo, useEffect, useState} from "react";

interface IProps {
	product: IProduct;
}
const Product = memo(({product}: IProps) => {
	const {id, title, price, thumbnail, stock, quantity} = product;
	// STATES
	const [isBtnDisabled, setIsBtnDisabled] = useState(false);
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
	return (
		<div className='w-[160px] flex flex-col justify-between space-y-2 border-2 border-gray-300 p-2 rounded-lg'>
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
