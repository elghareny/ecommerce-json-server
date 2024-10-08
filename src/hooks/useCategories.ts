/** @format */

import {
	categoriesCleanUp,
	getCategories,
} from "@redux/categories/categoriesSlice";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {useEffect} from "react";
const useCategories = () => {
	// STATES

	const dispatch = useAppDispatch();
	const {error, loading, records} = useAppSelector((state) => state.categories);

	// ACTIONS

	useEffect(() => {
		const promise = dispatch(getCategories());
		return () => {
			promise.abort();
			dispatch(categoriesCleanUp());
		};
	}, [dispatch]);

	return {error, loading, records};
};

export default useCategories;
