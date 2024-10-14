/** @format */

import ContentLoader from "react-content-loader";

const CategorySkeleton = () => {
	const skeletonRender = Array.from({length: 20}).map((_, index) => {
		return (
			<ContentLoader
				key={index}
				speed={2}
				width={200}
				height={230}
				viewBox='0 0 232 258'
				backgroundColor='#d9d9d9'
				foregroundColor='#e9e9e9'>
				<circle
					cx='90'
					cy='90'
					r='85'
				/>
				<rect
					x='40'
					y='205'
					rx='5'
					ry='5'
					width='100'
					height='8'
				/>
			</ContentLoader>
		);
	});
	return (
		<div className='grid gap-5 grid-cols-auto-fill-150 p-5'>
			{skeletonRender}
		</div>
	);
};

export default CategorySkeleton;
