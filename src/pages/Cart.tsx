/** @format */

import {CartItemsList, CartSubtotalPrice} from "@components/ecommerce";
import Loading from "@components/feedback/Loading/Loading";
import Heading from "@components/shared/Heading";
import useCart from "@hooks/useCart";

const Cart = () => {
	const {
		cartProducts,
		changeQuantityHandler,
		error,
		loading,
		removeCartItemHandler,
	} = useCart();

	return (
		<>
			<Heading title={`Your Cart`} />
			<div className=' text-xl font-semibold'>
				<Loading
					type='cart'
					error={error}
					status={loading}>
					<>
						{cartProducts.length ? (
							<CartItemsList
								items={cartProducts}
								changeQuantityHandler={changeQuantityHandler}
								removeCartItemHandler={removeCartItemHandler}
							/>
						) : (
							"Your Cart is empty"
						)}
					</>
				</Loading>
			</div>
			<CartSubtotalPrice cartProducts={cartProducts} />
		</>
	);
};

export default Cart;
