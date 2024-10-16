/** @format */

import ContentLoader from "react-content-loader";

const CartSkeleton = () => {
	const skeletonRender = Array.from({length: 20}).map((_, index) => {
		return (
			<div key={index}>
				<ContentLoader
					speed={2}
					width={1152}
					height={136}
					viewBox='0 0 1152 136'
					backgroundColor='#d9d9d9'
					foregroundColor='#e9e9e9'>
					<rect
						x='8'
						y='8'
						rx='10'
						ry='10'
						width='90'
						height='90'
					/>
					<rect
						x='118'
						y='15'
						rx='5'
						ry='5'
						width='230'
						height='8'
					/>
					<rect
						x='118'
						y='60'
						rx='5'
						ry='5'
						width='140'
						height='8'
					/>
					<rect
						x='118'
						y='105'
						rx='5'
						ry='5'
						width='120'
						height='8'
					/>
					<rect
						x='725'
						y='55'
						rx='5'
						ry='5'
						width='40'
						height='40'
					/>
					<rect
						x='780'
						y='55'
						rx='5'
						ry='5'
						width='43'
						height='43'
					/>
					<rect
						x='830'
						y='55'
						rx='5'
						ry='5'
						width='40'
						height='40'
					/>
					<rect
						x='920'
						y='55'
						rx='5'
						ry='5'
						width='42'
						height='42'
					/>
				</ContentLoader>
				<ContentLoader
					speed={2}
					width={1152}
					height={8}
					viewBox='0 0 1152 8'
					backgroundColor='#d9d9d9'
					foregroundColor='#e9e9e9'>
					<rect
						x='0'
						y='5'
						rx='5'
						ry='5'
						width='1152'
						height='4'
					/>
				</ContentLoader>
			</div>
		);
	});
	return (
		<div className='flex flex-col space-y-2 py-2 w-3/4 mx-auto'>
			{skeletonRender}
		</div>
	);
};

export default CartSkeleton;
