/** @format */

import {Product} from "@components/ecommerce";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/shared/GridList";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
	// Hook
	const {error, loading, productsFullInfo} = useWishlist();

	return (
		<div>
			<Loading
				type='product'
				error={error}
				status={loading}>
				<div className='grid gap-5 grid-cols-auto-fill-150 p-5'>
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
