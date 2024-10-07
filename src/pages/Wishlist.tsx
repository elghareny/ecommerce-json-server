/** @format */

import {Product} from "@components/ecommerce";
import Loading from "@components/feedback/Loading";
import GridList from "@components/shared/GridList";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {getWishlistItems, wishlistCleanUp} from "@redux/wishlist/wishlistSlice";
import {useEffect} from "react";

const Wishlist = () => {
	// STATES
	const dispatch = useAppDispatch();
	const {loading, error, records} = useAppSelector((state) => state.wishlist);
	const cartItems = useAppSelector((state) => state.cart.items);

	const productsFullInfo = records.map((record) => ({
		...record,
		quantity: cartItems[record.id],
		isLiked: true,
	}));

	// ACTIONS
	useEffect(() => {
		dispatch(getWishlistItems());
		return () => {
			dispatch(wishlistCleanUp());
		};
	}, [dispatch]);

	// RENDERS
	return (
		<div>
			<Loading
				error={error}
				status={loading}>
				<div className='grid gap-5 grid-cols-4 lg:grid-cols-8 p-5'>
					<GridList
						records={productsFullInfo}
						renderItem={(product) => (
							<Product
								key={product.id}
								product={product}
							/>
						)}
					/>
				</div>
			</Loading>
		</div>
	);
};

export default Wishlist;
