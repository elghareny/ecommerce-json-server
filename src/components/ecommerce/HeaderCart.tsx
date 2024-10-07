/** @format */
import Cart from "@assets/svg/cart.svg?react";
import {getCartTotalQuantitySelector} from "@redux/cart/cartSlice";
import {useAppSelector} from "@redux/hooks";
import {useEffect, useState} from "react";
const HeaderCart = () => {
	// STATES

	const [isAnimate, setIsAnimate] = useState(false);
	const totalQuantity = useAppSelector(getCartTotalQuantitySelector);

	useEffect(() => {
		if (!totalQuantity) return;
		setIsAnimate(true);
		const debounce = setTimeout(() => {
			setIsAnimate(false);
		}, 300);

		return () => {
			clearTimeout(debounce);
		};
	}, [totalQuantity]);
	return (
		<div className=' cursor-pointer self-end flex space-x-2 items-center justify-center border-r-[3px] pr-2'>
			<div className='relative'>
				<Cart
					fill='#fff'
					title='ecommerce cart'
				/>
				{totalQuantity > 0 && (
					<div
						className={`absolute -top-4 -right-2 w-6 h-6 text-sm font-semibold  bg-[var(--color-primary)] border rounded-full flex justify-center items-center ${
							isAnimate && "pump-cart-icon"
						}`}>
						{totalQuantity}
					</div>
				)}
			</div>
			<h3 className='text-xl font-semibold'>Cart</h3>
		</div>
	);
};

export default HeaderCart;
