/** @format */

import {getCategories} from "@redux/categories/categoriesSlice";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {getAllProducts, productsCleanUp} from "@redux/products/productSlice";
import {setFilterModal} from "@redux/shared/globalSlice";
import {useEffect, useState} from "react";

const useFilterProducts = () => {
	const dispatch = useAppDispatch();
	const {isFilterModal} = useAppSelector((state) => state.global);
	const {records, loading, error} = useAppSelector((state) => state.products);
	const categories = useAppSelector((state) => state.categories.records);

	const cartItems = useAppSelector((state) => state.cart.items);
	const wishlistItemsId = useAppSelector((state) => state.wishlist.itemsID);
	const userAccessToken = useAppSelector((state) => state.auth.accessToken);

	const productsFullInfo = records.map((el) => ({
		...el,
		quantity: cartItems[el.id] as number,
		isLiked: wishlistItemsId.includes(el.id),
		isAuthenticated: userAccessToken ? true : false,
	}));
	///////////////////////////////////////////////////////

	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedPrice, setSelectedPrice] = useState<number>(0);

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name} = e.target;

		setSelectedCategories((prev) =>
			prev.includes(name) ? prev.filter((el) => el !== name) : [...prev, name],
		);
	};
	const handleRangePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {value} = e.target;

		setSelectedPrice(+value);
	};

	const filterModalHandler = () => {
		dispatch(setFilterModal());
	};

	const filteredProducts = selectedPrice
		? selectedCategories.length
			? productsFullInfo
					.filter((el) => selectedCategories.includes(el.category))
					.filter((el) => el.price <= selectedPrice)
			: productsFullInfo.filter((el) => el.price <= selectedPrice)
		: selectedCategories.length
		? productsFullInfo.filter((el) => selectedCategories.includes(el.category))
		: productsFullInfo;

	useEffect(() => {
		dispatch(getAllProducts());
		dispatch(getCategories());
		return () => {
			dispatch(productsCleanUp());
		};
	}, [dispatch]);

	return {
		loading,
		error,
		categories,
		handleCheckboxChange,
		handleRangePriceChange,
		filteredProducts,
		selectedCategories,
		selectedPrice,
		isFilterModal,
		filterModalHandler,
	};
};

export default useFilterProducts;
