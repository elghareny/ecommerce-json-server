/** @format */

import {Product} from "@components/ecommerce";
import Loading from "@components/feedback/Loading";
import GridList from "@components/shared/GridList";
import Heading from "@components/shared/Heading";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {getProductsBySlug, productsCleanUp} from "@redux/products/productSlice";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

const Products = () => {
	// STATES
	console.log("Products");

	const params = useParams();
	const dispatch = useAppDispatch();
	const {error, loading, records} = useAppSelector((state) => state.products);

	const cartItems = useAppSelector((state) => state.cart.items);
	const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsID);

	const productsFullInfo = records.map((el) => ({
		...el,
		quantity: cartItems[el.id] as number,
		isLiked: wishlistItemsId.includes(el.id),
	}));

	// ACTIONS

	useEffect(() => {
		dispatch(getProductsBySlug(params.slug as string));
		return () => {
			dispatch(productsCleanUp());
		};
	}, [dispatch, params]);

	// RENDERS

	return (
		<>
			<Heading title={`${params.slug?.toUpperCase()}`} />
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
		</>
	);
};

export default Products;
