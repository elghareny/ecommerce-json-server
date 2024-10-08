/** @format */

import {TLoading} from "@interfaces/index";
import CategorySkeleton from "./skeletons/CategorySkeleton";
import ProductSkeleton from "./skeletons/ProductSkeleton";
import CartSkeleton from "./skeletons/CartSkeleton";

interface IProps {
	status: TLoading;
	error: null | string;
	children: React.ReactNode;
	type: keyof typeof skeletonsTypes;
}
const skeletonsTypes = {
	category: CategorySkeleton,
	product: ProductSkeleton,
	cart: CartSkeleton,
};

const Loading = ({status, error, children, type}: IProps) => {
	const LoadingType = skeletonsTypes[type];
	if (status === "pending") {
		return <LoadingType />;
	}
	if (status === "failed") {
		return <p>{error}</p>;
	}
	return <>{children}</>;
};

export default Loading;
