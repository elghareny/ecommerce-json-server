/** @format */

const Product = () => {
	return (
		<div className='w-[160px] flex flex-col justify-between space-y-2 border-2 border-gray-300 p-2 rounded-lg'>
			<div className='rounded-lg'>
				<img
					className='w-full h-[180px] bg-[#f2f2f2] block object-cover rounded-lg'
					src='https://image.made-in-china.com/43f34j00RrfcaJubJmqE/New-European-and-American-Sports-Casual-Work-Clothes-Two-Piece-Men-s-Large-Fitness-Running-Training-Sweater-Trousers-Set.webp'
					alt=''
				/>
			</div>
			<h2 className='text-base font-semibold  w-full overflow-hidden text-ellipsis'>
				Title
			</h2>
			<h3 className='text-base font-semibold'>10 EGP</h3>
			<button className=''>Add to cart</button>
		</div>
	);
};

export default Product;
