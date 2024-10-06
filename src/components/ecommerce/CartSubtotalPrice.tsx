/** @format */

import {IProduct} from "@interfaces/index";

/** @format */
interface IProps {
	cartProducts: IProduct[];
}
const CartSubtotalPrice = ({cartProducts}: IProps) => {
	const cartSubtotalPrice = cartProducts.reduce((acc, el) => {
		return acc + el.price * (el.quantity ?? 0);
	}, 0);
	return (
		<div className='sticky bottom-0 flex justify-between items-center bg-white px-5 py-2'>
			<span className='text-xl font-semibold'>Subtotal:</span>
			<span className='text-xl font-semibold'>
				{cartSubtotalPrice.toFixed(2)}
			</span>
		</div>
	);
};

export default CartSubtotalPrice;
