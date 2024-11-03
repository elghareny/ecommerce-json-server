/** @format */

import {Product} from "@components/ecommerce";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/shared/GridList";
import useFilterProducts from "@hooks/useFilterProducts";
import {ArrowBigLeftDash} from "lucide-react";

const Home = () => {
	const {
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
	} = useFilterProducts();

	const asideRender = () => {
		return (
			<>
				<div className='border-b-2 pb-5'>
					<div className='flex items-center justify-between'>
						<h3 className='text-lg font-semibold mb-1'>Categories</h3>
						{isFilterModal && (
							<ArrowBigLeftDash
								className='cursor-pointer'
								size={22}
								onClick={filterModalHandler}
							/>
						)}
					</div>
					{categories.map((category) => (
						<div key={category.id}>
							<input
								size={20}
								type='checkbox'
								id={category.name}
								name={category.slug}
								value={category.slug}
								checked={selectedCategories.includes(category.slug)}
								onChange={handleCheckboxChange}
							/>
							<label
								className='text-sm'
								htmlFor={category.name}>
								{" "}
								{category.name}
							</label>
						</div>
					))}
				</div>
				<div className='flex flex-col mt-5'>
					<h3 className='text-lg font-semibold mb-1'>Price</h3>
					<div className='w-full flex items-center space-x-3'>
						<input
							type='range'
							id='price'
							min={0}
							max={40000}
							step={100}
							value={selectedPrice}
							onChange={handleRangePriceChange}
						/>
						<label
							className=' font-semibold'
							htmlFor='price'>
							{selectedPrice} EGP
						</label>
					</div>
				</div>
			</>
		);
	};

	return (
		<div className='w-full grid md:grid-cols-[minmax(100px,_250px)_minmax(300px,_1fr)]'>
			{isFilterModal && (
				<div
					className={`md:hidden fixed inset-0 z-[150] flex w-screen h-screen transition-all duration-300 ease-in-out ${
						isFilterModal ? "scale-100" : " scale-0"
					}`}>
					<div className='flex flex-col bg-white w-full h-full overflow-y-auto p-5'>
						{asideRender()}
					</div>
					<div
						className='flex justify-center items-center bg-slate-300/40 w-full h-full'
						onClick={filterModalHandler}></div>
				</div>
			)}
			<aside className='border-r border-slate-200 hidden md:block p-3'>
				{asideRender()}
			</aside>
			<Loading
				type='product'
				error={error}
				status={loading}>
				<div
					className={` p-5 ${
						filteredProducts.length === 0
							? "flex items-center justify-center"
							: `h-fit grid gap-5 text-center grid-cols-auto-fill-150`
					}`}>
					<GridList
						emptyMessage='No Products found'
						records={filteredProducts}
						renderItem={(product) => (
							<Product
								key={product.id}
								product={product}
							/>
						)}
					/>
				</div>
			</Loading>
		</div>
	);
};

export default Home;
