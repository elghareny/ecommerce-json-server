/** @format */

import {IProduct} from "@interfaces/index";
import {memo} from "react";
import ProductFullInfo from "../ProductFullInfo";
import Button from "@components/shared/Button";
import {Minus, Plus, Trash2} from "lucide-react";

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
	const {quantity, stock} = product;

	const currentRemainingQuantity = stock - (quantity ?? 0);
	return (
		<div className='flex justify-between p-2'>
			<ProductFullInfo
				product={product}
				type='row'
			/>
			{/* <div className='flex space-x-5'>
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
			</div> */}
			<div className='flex justify-center items-center space-x-10'>
				<div className='flex flex-col justify-center items-center space-y-3'>
					<div className='flex items-center justify-center space-x-5'>
						<Button
							variant={"custom"}
							className='p-[6px]'
							disabled={currentRemainingQuantity === 0}
							onClick={() => {
								changeQuantityHandler(product.id, quantity ?? 0, true);
							}}>
							<Plus size={20} />
						</Button>
						<span className='flex items-center justify-center text-center border border-gray-400 rounded-lg p-1 w-10 h-10  text-base font-semibold text-indigo-600'>
							{quantity}
						</span>
						<Button
							className='p-[6px]'
							variant={"custom"}
							disabled={quantity === 1}
							onClick={() => {
								changeQuantityHandler(product.id, quantity ?? 0, false);
							}}>
							<Minus size={20} />
						</Button>
					</div>
				</div>
				<Button
					variant={"danger"}
					className='p-2'
					onClick={() => removeCartItemHandler(product.id)}>
					<Trash2 size={20} />
				</Button>
			</div>
		</div>
	);
};

export default memo(CartItem);
