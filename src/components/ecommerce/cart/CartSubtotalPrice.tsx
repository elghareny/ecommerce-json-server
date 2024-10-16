/** @format */

import Modal from "@components/shared/Modal";
import {IProduct} from "@interfaces/index";
import {clearCartAfterPlaceOrder} from "@redux/cart/cartSlice";
import {useAppDispatch} from "@redux/hooks";
import placeOrder from "@redux/order/thunk/placeOrder";
import {useState} from "react";

/** @format */
interface IProps {
	cartProducts: IProduct[];
	userAccessToken?: string | null;
}
const CartSubtotalPrice = ({cartProducts, userAccessToken}: IProps) => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isShowModal, setIsShowModal] = useState(false);
	const cartSubtotalPrice = cartProducts.reduce((acc, el) => {
		return acc + el.price * (el.quantity ?? 0);
	}, 0);

	const modalHandler = () => {
		setIsShowModal(!isShowModal);
		setError(null);
	};
	const placeOrderHandler = () => {
		setLoading(true);
		dispatch(placeOrder(cartSubtotalPrice))
			.unwrap()
			.then(() => {
				dispatch(clearCartAfterPlaceOrder());
				setIsShowModal(!isShowModal);
			})
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	};
	return (
		<>
			<Modal
				isShowModal={isShowModal}
				modalHandler={modalHandler}
				title='Placing Order'
				backdrop='static'>
				<Modal.Body>
					<p>
						Are you sure you want to place an order with subtotal :{" "}
						{cartSubtotalPrice.toFixed(2)} EGP ?
					</p>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={placeOrderHandler}>Confirm</button>
					<button onClick={modalHandler}>Cancel</button>
				</Modal.Footer>
			</Modal>
			<div className='sticky bottom-0 flex justify-between items-center bg-white p-5 w-3/4 mx-auto border-t-4 border-gray-700'>
				<span className='text-xl font-semibold'>Subtotal:</span>
				<div className='flex items-center space-x-3'>
					<span className='text-xl font-semibold'>
						{cartSubtotalPrice.toFixed(2)}
					</span>
					{userAccessToken && (
						<button onClick={() => setIsShowModal(true)}>Place Order</button>
					)}
				</div>
			</div>
		</>
	);
};

export default CartSubtotalPrice;
