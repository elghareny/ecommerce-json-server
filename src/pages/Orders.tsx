/** @format */

import ProductFullInfo from "@components/ecommerce/ProductFullInfo";
import Loading from "@components/feedback/Loading/Loading";
import Modal from "@components/shared/Modal";
import useOrder from "@hooks/useOrder";

const Orders = () => {
	const {
		orderList,
		error,
		loading,
		isShowModal,
		SelectedOrders,
		modalHandler,
		selectOrderHandler,
	} = useOrder();
	return (
		<div>
			<Modal
				isShowModal={isShowModal}
				modalHandler={modalHandler}
				title='Order Placed Details'>
				<Modal.Body>
					<div className='overflow-y-scroll grid gap-3 text-center grid-cols-auto-fill-130 w-[600px] max-h-[calc(100vh-100px)] '>
						{SelectedOrders.map((product) => (
							<ProductFullInfo
								key={product.id}
								product={product}
								type='column'
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
							<th className='border'>Id</th>
							<th className='border'>Items</th>
							<th className='border'>Total Price</th>
							<th className='border'>Actions</th>
						</tr>
					</thead>
					<tbody className='text-center'>
						{orderList?.map((order) => (
							<tr
								key={order.id}
								className='border-b'>
								<td className='border'>{order.id}</td>
								<td className='border'>{order.items.length} Orders</td>
								<td className='border'>{order.subtotal.toFixed(2)} EGP</td>
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
