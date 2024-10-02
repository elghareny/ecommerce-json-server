/** @format */
import Cart from "@assets/svg/cart.svg?react";
const HeaderCart = () => {
	return (
		<div className='relative cursor-pointer self-end'>
			<Cart title='ecommerce cart' />
			<div className='absolute -top-5 -right-2 w-6 h-6  bg-[var(--color-primary)] border rounded-full flex justify-center items-center'>
				0
			</div>
		</div>
	);
};

export default HeaderCart;
