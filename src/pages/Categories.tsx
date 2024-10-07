/** @format */

import {Category} from "@components/ecommerce";
import Loading from "@components/feedback/Loading";
import GridList from "@components/shared/GridList";
import Heading from "@components/shared/Heading";
import {
	categoriesCleanUp,
	getCategories,
} from "@redux/categories/categoriesSlice";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {useEffect} from "react";

const Categories = () => {
	// STATES

	const dispatch = useAppDispatch();
	const {error, loading, records} = useAppSelector((state) => state.categories);

	// ACTIONS

	useEffect(() => {
		dispatch(getCategories());
		return () => {
			dispatch(categoriesCleanUp());
		};
	}, [dispatch]);

	// RENDERS

	return (
		<>
			<Heading title={`Categories`} />
			<Loading
				error={error}
				status={loading}>
				<div className='grid gap-5 grid-cols-auto-fill-200 p-5'>
					<GridList
						records={records}
						renderItem={(category) => (
							<Category
								key={category.id}
								category={category}
							/>
						)}
					/>
				</div>
			</Loading>
		</>
	);
};

export default Categories;
