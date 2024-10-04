/** @format */

import {IProduct} from "@interfaces/index";

interface IProps {
	product: IProduct;
}
const Product = ({product}: IProps) => {
	return (
		<div className='w-[160px] flex flex-col justify-between space-y-2 border-2 border-gray-300 p-2 rounded-lg'>
			<div className='h-[180px] rounded-lg'>
				<img
					loading='lazy'
					className='w-full h-full bg-[#f2f2f2] block object-cover rounded-lg'
					src={product.thumbnail}
					alt={product.title}
				/>
			</div>
			<h2 className='text-base font-semibold  w-full overflow-hidden text-ellipsis'>
				{product.title}
			</h2>
			<h3 className='text-base font-semibold'>{product.price} EGP</h3>
			<button className=''>Add to cart</button>
		</div>
	);
};

export default Product;
