/** @format */

import {CartItemsList, CartSubtotalPrice} from "@components/ecommerce";
import Loading from "@components/feedback/Loading/Loading";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import Heading from "@components/shared/Heading";
import useCart from "@hooks/useCart";

const Cart = () => {
	const {
		cartProducts,
		changeQuantityHandler,
		error,
		loading,
		removeCartItemHandler,
		userAccessToken,
		placeOrderStatus,
	} = useCart();

	return (
		<div className='min-h-[calc(100vh-68px)]'>
			<Heading title={`Your Cart`} />
			<div className=' text-xl font-semibold h-full'>
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
							<div className='fixed inset-0'>
								{placeOrderStatus === "succeeded" ? (
									<LottieHandler
										type='placeOrderDone'
										message={"Your order has placed successfully"}
									/>
								) : (
									<LottieHandler
										type='shoppingEmpty'
										message={"Your cart is empty"}
									/>
								)}
							</div>
						)}
					</>
				</Loading>
			</div>
			<CartSubtotalPrice
				cartProducts={cartProducts}
				userAccessToken={userAccessToken}
			/>
		</div>
	);
};

export default Cart;
