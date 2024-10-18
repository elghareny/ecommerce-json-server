/** @format */

import {IProduct} from "@interfaces/index";

interface IProps {
	product: IProduct;
	type: "row" | "column";
}

const ProductFullInfo = ({product, type}: IProps) => {
	const {title, thumbnail, stock, quantity, price} = product;
	const currentRemainingQuantity = stock - (quantity ?? 0);
	return (
		<div
			className={`flex ${
				type === "row"
					? "space-x-5"
					: "flex-col space-y-2 border p-2 rounded-lg w-[150px]"
			} `}>
			<img
				src={thumbnail}
				alt={title}
				className={`${
					type === "row" ? "w-[90px] h-[90px]" : "w-[140px] h-[120px]"
				}  object-cover`}
			/>
			<div
				className={`flex flex-col justify-center items-start ${
					type === "row" ? "space-y-3" : "space-y-1"
				} `}>
				<h2
					className={`${
						type === "row" ? "text-base font-semibold" : "text-sm"
					}`}>
					{type === "column" ? title.slice(0, 15) + "..." : title}
				</h2>
				<h3
					className={`${
						type === "row" ? "text-base font-semibold" : "text-sm"
					}`}>
					price: <span className='text-indigo-600'>{price.toFixed(2)}EG</span>
				</h3>
				<h3
					className={`${
						type === "row" ? "text-base font-semibold" : "text-sm"
					}`}>
					totalPrice: {((quantity ?? 1) * price).toFixed(2)} EG
				</h3>
				{type === "row" && (
					<h3
						className={`${
							type === "row" ? "text-base font-semibold" : "text-sm"
						}`}>
						stock: {currentRemainingQuantity}
					</h3>
				)}
			</div>
		</div>
	);
};

export default ProductFullInfo;
