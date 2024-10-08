/** @format */

import {Category} from "@components/ecommerce";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/shared/GridList";
import Heading from "@components/shared/Heading";
import useCategories from "@hooks/useCategories";

const Categories = () => {
	// HOOK
	const {error, loading, records} = useCategories();

	return (
		<>
			<Heading title={`Categories`} />
			<Loading
				type='category'
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
