/** @format */

import {Product} from "@components/ecommerce";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/shared/GridList";
import Heading from "@components/shared/Heading";
import useProducts from "@hooks/useProducts";

const Products = () => {
	const {error, loading, productsFullInfo, params} = useProducts();

	return (
		<>
			<Heading title={`${params.slug?.toUpperCase()}`} />
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
		</>
	);
};

export default Products;
