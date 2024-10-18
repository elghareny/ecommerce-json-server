/** @format */

import {IProduct} from "@interfaces/index";
import {addToCart} from "@redux/cart/cartSlice";
import {useAppDispatch} from "@redux/hooks";
import {memo, useEffect, useState} from "react";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import {likeToggle} from "@redux/wishlist/wishlistSlice";
import Modal from "@components/shared/Modal";
import Spinner from "@components/shared/Spinner";
import Button from "@components/shared/Button";

interface IProps {
	product: IProduct;
}
const Product = memo(({product}: IProps) => {
	const {
		id,
		title,
		price,
		thumbnail,
		stock,
		quantity,
		isLiked,
		isAuthenticated,
	} = product;
	// STATES
	const [isBtnDisabled, setIsBtnDisabled] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false);
	const [isShowModal, setIsShowModal] = useState(false);
	const dispatch = useAppDispatch();

	const currentRemainingQuantity = stock - (quantity ?? 0);
	const quantityReachedToMax = currentRemainingQuantity > 0 ? false : true;

	// HANDLER
	const modalHandler = () => {
		setIsShowModal(!isShowModal);
	};
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

	const addToCartHandler = () => {
		dispatch(addToCart(id));
		setIsBtnDisabled(true);
		setIsLoadingAddToCart(true);
	};

	const likeToggleHandler = () => {
		if (isAuthenticated) {
			if (!isLoading) {
				setIsLoading(true);
				dispatch(likeToggle(id))
					.unwrap()
					.then(() => setIsLoading(false))
					.catch(() => setIsLoading(false));
			}
		} else {
			setIsShowModal(true);
		}
	};
	return (
		<>
			<Modal
				isShowModal={isShowModal}
				modalHandler={modalHandler}
				title='Login Required'>
				<Modal.Body>
					<p>Please login to continue</p>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={modalHandler}>Cancel</button>
				</Modal.Footer>
			</Modal>

			<div className='relative w-[160px] flex flex-col justify-between  shadow-[0_2px_10px_3px_rgba(78,102,137,0.2)] p-2 rounded-lg'>
				<button
					className='absolute -top-2 -right-2 bg-white w-fit p-2 rounded-full flex items-center justify-center duration-300 hover:drop-shadow-[0_10px_20px_rgba(255,0,0,.4)] object-cover'
					onClick={likeToggleHandler}>
					{isLoading ? (
						<Spinner className='text-red-500' />
					) : isLiked ? (
						<LikeFill
							width={20}
							hanging={20}
						/>
					) : (
						<Like
							width={20}
							hanging={20}
						/>
					)}
				</button>
				<div className='h-[150px] rounded-lg'>
					<img
						loading='lazy'
						className='w-full h-full bg-[#f2f2f2] block object-cover rounded-lg'
						src={thumbnail}
						alt={title}
					/>
				</div>
				<h2 className='text-base font-semibold  w-full overflow-hidden text-ellipsis'>
					{title.slice(0, 15)}...
				</h2>
				<h3 className='text-sm font-semibold text-slate-500'>
					{price.toFixed(2)} EGP
				</h3>
				<p className='text-sm font-semibold text-slate-500'>
					stock : {currentRemainingQuantity}
				</p>
				<Button
					className='mt-2'
					isLoading={isLoadingAddToCart}
					spinnerType='circular'
					size={"sm"}
					disabled={isBtnDisabled || quantityReachedToMax}
					onClick={addToCartHandler}>
					Add to cart
				</Button>
			</div>
		</>
	);
});

export default Product;
