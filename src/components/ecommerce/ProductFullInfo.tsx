/** @format */

import {IProduct} from "@interfaces/index";
import {Link} from "react-router-dom";

interface IProps {
	product: IProduct;
	type: "row" | "column";
}

const ProductFullInfo = ({product, type}: IProps) => {
	const {id, title, thumbnail, stock, quantity, price, priceAfterDiscount} =
		product;
	const currentRemainingQuantity = stock - (quantity ?? 0);
	return (
		<div
			className={` flex ${
				type === "row"
					? "space-x-5"
					: "flex-col space-y-2 border p-2 rounded-lg w-[150px]"
			} `}>
			<Link to={`/productsDetails/${id}`}>
				<img
					src={thumbnail}
					alt={title}
					className={`${
						type === "row" ? "w-[90px] h-[90px]" : "w-[140px] h-[120px]"
					}  object-cover`}
				/>
			</Link>
			<div
				className={` flex flex-col justify-center items-start ${
					type === "row" ? "space-y-3" : "space-y-1"
				} `}>
				<h2
					className={`${
						type === "row" ? " text-sm md:text-base font-semibold" : "text-sm"
					}`}>
					{type === "column" ? title.slice(0, 15) + "..." : title}
				</h2>
				<h3
					className={`${
						type === "row" ? "text-sm md:text-base font-semibold" : "text-sm"
					}`}>
					price:{" "}
					<span className='text-gray-400 line-through mr-1'>
						{price.toFixed(2)}EG
					</span>
					<span className=''>{priceAfterDiscount!.toFixed(2)}EG</span>
				</h3>
				<h3
					className={`${
						type === "row" ? "text-sm md:text-base font-semibold" : "text-sm"
					}`}>
					totalPrice: {((quantity ?? 1) * priceAfterDiscount!).toFixed(2)} EG
				</h3>
				{type === "row" && (
					<h3
						className={`${
							type === "row" ? "text-sm md:text-base font-semibold" : "text-sm"
						}`}>
						stock: {currentRemainingQuantity}
					</h3>
				)}
			</div>
		</div>
	);
};

export default ProductFullInfo;
