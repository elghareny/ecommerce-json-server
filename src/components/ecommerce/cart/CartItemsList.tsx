/** @format */

import {IProduct} from "@interfaces/index";
import CartItem from "./CartItem";

interface IProps {
	items: IProduct[];
	changeQuantityHandler: (id: number, quantity: number, isAdd: boolean) => void;
	removeCartItemHandler: (id: number) => void;
}

const CartItemsList = ({
	items,
	changeQuantityHandler,
	removeCartItemHandler,
}: IProps) => {
	const cartProductsRender = items.map((product) => {
		return (
			<div
				key={product.id}
				className='flex flex-col space-y-2 py-2 w-3/4 mx-auto'>
				<CartItem
					product={product}
					changeQuantityHandler={changeQuantityHandler}
					removeCartItemHandler={removeCartItemHandler}
				/>
				<div className='w-full h-[1px] bg-slate-300'></div>
			</div>
		);
	});
	return <div>{cartProductsRender}</div>;
};

export default CartItemsList;
