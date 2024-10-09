/** @format */

import {Product} from "@components/ecommerce";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/shared/GridList";
import Heading from "@components/shared/Heading";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
	// Hook
	const {error, loading, productsFullInfo} = useWishlist();

	return (
		<div>
			<Heading title={`Wishlist`} />
			<Loading
				type='product'
				error={error}
				status={loading}>
				<div
					className={` p-5 ${
						productsFullInfo.length === 0
							? "flex items-center justify-center"
							: `grid gap-5 grid-cols-auto-fill-150`
					}`}>
					<GridList
						emptyMessage='Your wishlist is empty'
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
