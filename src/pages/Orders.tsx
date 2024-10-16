/** @format */

import {Product} from "@components/ecommerce";
import Loading from "@components/feedback/Loading/Loading";
import Modal from "@components/shared/Modal";
import {IProduct} from "@interfaces/index";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {getOrders, resetOrderStatus} from "@redux/order/orderSlice";
import {useEffect, useState} from "react";

const Orders = () => {
	const dispatch = useAppDispatch();
	const {orderList, error, loading} = useAppSelector((state) => state.order);
	const [isShowModal, setIsShowModal] = useState(false);
	const [SelectedOrders, setSelectedOrders] = useState<IProduct[]>([]);

	const modalHandler = () => {
		setIsShowModal(false);
		setSelectedOrders([]);
	};

	const selectOrderHandler = (id: number) => {
		const orderSelected = orderList?.find((order) => order.id === id);
		const newItems = orderSelected?.items ?? [];
		setIsShowModal(true);
		setSelectedOrders((prev) => [...prev, ...newItems]);
	};

	useEffect(() => {
		dispatch(getOrders());
		return () => {
			dispatch(getOrders()).abort();
			dispatch(resetOrderStatus());
		};
	}, [dispatch]);
	return (
		<div>
			<Modal
				isShowModal={isShowModal}
				modalHandler={modalHandler}
				title='Order Placed Details'>
				<Modal.Body>
					<div className='overflow-y-auto grid gap-5 text-center grid-cols-auto-fill-150 w-[600px] h-[400px] '>
						{SelectedOrders.map((product) => (
							<Product
								key={product.id}
								product={product}
							/>
						))}
					</div>
				</Modal.Body>
			</Modal>
			<h1>Orders Page</h1>
			<Loading
				error={error}
				status={loading}
				type='category'>
				<table className='w-full border'>
					<thead className='border-b'>
						<tr>
							<th className='border'>Number</th>
							<th className='border'>Items</th>
							<th className='border'>Total Price</th>
							<th className='border'>Actions</th>
						</tr>
					</thead>
					<tbody className='text-center'>
						{orderList?.map((order, idx) => (
							<tr
								key={order.id}
								className='border-b'>
								<td className='border'>{idx + 1}</td>
								<td className='border'>{order.items.length} Orders</td>
								<td className='border'>{order.subtotal.toFixed(2)}</td>
								<td className='border'>
									<button
										onClick={() => {
											selectOrderHandler(order.id);
										}}>
										details
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Loading>
		</div>
	);
};

export default Orders;
