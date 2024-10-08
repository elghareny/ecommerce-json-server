/** @format */

import ContentLoader from "react-content-loader";

const CategorySkeleton = () => {
	const skeletonRender = Array.from({length: 20}).map((_, index) => {
		return (
			<ContentLoader
				key={index}
				speed={2}
				width={232}
				height={258}
				viewBox='0 0 232 258'
				backgroundColor='#d9d9d9'
				foregroundColor='#e9e9e9'>
				<circle
					cx='115'
					cy='110'
					r='100'
				/>
				<rect
					x='45'
					y='230'
					rx='5'
					ry='5'
					width='150'
					height='8'
				/>
			</ContentLoader>
		);
	});
	return (
		<div className='grid gap-5 grid-cols-auto-fill-200 p-5'>
			{skeletonRender}
		</div>
	);
};

export default CategorySkeleton;
