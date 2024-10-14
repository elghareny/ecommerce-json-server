/** @format */

import {IProduct} from "@interfaces/index";
import {memo} from "react";

/** @format */
interface IProps {
	product: IProduct;
	changeQuantityHandler: (id: number, quantity: number, isAdd: boolean) => void;
	removeCartItemHandler: (id: number) => void;
}

const CartItem = ({
	product,
	changeQuantityHandler,
	removeCartItemHandler,
}: IProps) => {
	const {thumbnail, price, title, quantity, stock} = product;

	const currentRemainingQuantity = stock - (quantity ?? 0);
	return (
		<div className='flex justify-between p-2'>
			<div className='flex space-x-5'>
				<img
					src={thumbnail}
					alt={title}
					className='w-[90px] h-[90px] object-cover'
				/>
				<div className='flex flex-col justify-center items-start space-y-3'>
					<h2 className='text-base font-semibold'>{title}</h2>
					<h3 className='text-base font-semibold'>
						price: <span className='text-indigo-600'>{price.toFixed(2)}EG</span>
					</h3>
					<h3 className='text-base font-semibold'>
						stock: {currentRemainingQuantity}
					</h3>
				</div>
			</div>
			<div className='flex justify-center items-center space-x-10'>
				<div className='flex flex-col justify-center items-center space-y-3'>
					<div className='flex items-center justify-center space-x-5'>
						<button
							disabled={currentRemainingQuantity === 0}
							onClick={() => {
								changeQuantityHandler(product.id, quantity ?? 0, true);
							}}>
							+
						</button>
						<span className=' text-center border border-gray-400 rounded-lg p-1 w-8 h-8  text-base font-semibold text-indigo-600'>
							{quantity}
						</span>
						<button
							disabled={quantity === 1}
							onClick={() => {
								changeQuantityHandler(product.id, quantity ?? 0, false);
							}}>
							-
						</button>
					</div>
				</div>
				<button onClick={() => removeCartItemHandler(product.id)}>
					Remove
				</button>
			</div>
		</div>
	);
};

export default memo(CartItem);
