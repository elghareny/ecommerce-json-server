/** @format */

import ContentLoader from "react-content-loader";

const ProductSkeleton = () => {
	const skeletonRender = Array.from({length: 20}).map((_, index) => {
		return (
			<ContentLoader
				key={index}
				speed={2}
				width={160}
				height={320}
				viewBox='0 0 160 320'
				backgroundColor='#d9d9d9'
				foregroundColor='#e9e9e9'>
				{/* <rect
					x='32'
					y='179'
					rx='3'
					ry='3'
					width='105'
					height='8'
				/> */}
				<rect
					x='5'
					y='5'
					rx='10'
					ry='10'
					width='140'
					height='180'
				/>
				<rect
					x='10'
					y='200'
					rx='5'
					ry='5'
					width='100'
					height='8'
				/>
				<rect
					x='10'
					y='220'
					rx='5'
					ry='5'
					width='80'
					height='8'
				/>
				<rect
					x='10'
					y='240'
					rx='5'
					ry='5'
					width='80'
					height='8'
				/>
				<rect
					x='10'
					y='260'
					rx='5'
					ry='5'
					width='120'
					height='30'
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

export default ProductSkeleton;
