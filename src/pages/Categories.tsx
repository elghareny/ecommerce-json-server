/** @format */

import {Category} from "@components/ecommerce";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/shared/GridList";
import useCategories from "@hooks/useCategories";

const Categories = () => {
	// HOOK
	const {error, loading, records} = useCategories();

	return (
		<>
			<Loading
				type='category'
				error={error}
				status={loading}>
				<div
					className={` p-5 ${
						records.length === 0
							? "flex items-center justify-center"
							: `grid gap-5 grid-cols-auto-fill-150`
					}`}>
					<GridList
						emptyMessage='No categories found'
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
