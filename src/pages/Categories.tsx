/** @format */

import {Category} from "@components/ecommerce";

const Categories = () => {
	return (
		<div className='grid gap-5 grid-cols-4 lg:grid-cols-8 p-5'>
			<Category />
			<Category />
			<Category />
			<Category />
			<Category />
		</div>
	);
};

export default Categories;
