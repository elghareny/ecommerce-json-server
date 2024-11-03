/** @format */

import Loading from "@components/feedback/Loading/Loading";
import Button from "@components/shared/Button";
import useProductDetails from "@hooks/useProductDetails";
import avatar from "@assets/boy.png";

import {Minus, Plus, ShoppingCart} from "lucide-react";

const ProductDetails = () => {
	const {
		loading,
		error,
		title,
		description,
		price,
		priceAfterDiscount,
		rating,
		images,
		meta,
		reviews,
		isBtnDisabled,
		imgIdx,
		isLoadingAddToCart,
		currentRemainingQuantity,
		onChangeImage,
		changeQuantityHandler,
		addToCartHandler,
		quantityValue,
	} = useProductDetails();
	return (
		<div className='w-full flex flex-col justify-center items-center'>
			<Loading
				type='product'
				error={error}
				status={loading}>
				<div className='flex flex-col items-center md:flex-row space-x-5 mt-5'>
					<div className='flex flex-col w-[400px] md:w-[500px] space-y-5'>
						<img
							className='w-full h-[400px] bg-[#f2f2f2] block object-cover rounded-lg'
							src={`${images?.[imgIdx]}`}
							alt={title}
						/>
						<div className='flex items-center px-2 space-x-3 max-w-[500px] min-h-[120px] overflow-x-auto '>
							{images?.map((image, idx) => (
								<img
									loading='lazy'
									className={`w-[100px] h-[100px] bg-[#f2f2f2] object-cover rounded-lg cursor-pointer ${
										imgIdx === idx
											? "border-2 border-[#1725547b] scale-110"
											: ""
									}`}
									src={image}
									alt={image}
									key={idx}
									onClick={() => {
										onChangeImage(idx);
									}}
								/>
							))}
						</div>
					</div>
					<div className='flex flex-col space-y-5 p-5'>
						<h3 className='text-3xl font-semibold'>{title}</h3>
						<div className='flex items-center'>
							{[1, 2, 3, 4, 5].map((star) => {
								return (
									<span
										className={`cursor-default text-3xl ${
											Number(rating?.toFixed(0)) >= star
												? "text-yellow-400"
												: "text-gray-300 "
										} text-gray-300`}
										key={star}>
										★
									</span>
								);
							})}
							<p className='text-xl font-semibold ml-3'>({rating})</p>
						</div>
						{priceAfterDiscount ? (
							<div className='flex space-x-5'>
								<p className='text-3xl font-semibold line-through text-red-500'>
									${price}
								</p>
								<p className='text-3xl font-semibold'>${priceAfterDiscount}</p>
							</div>
						) : (
							<p className='text-3xl font-semibold'>${price}</p>
						)}
						<p className='text-xl font-semibold'>
							Stock: {currentRemainingQuantity}
						</p>
						<p className='text-gray-700'>{description}</p>
						<div className='flex space-x-5'>
							<div className='flex justify-between items-center space-x-5 w-fit border border-gray-300 rounded-lg'>
								<Button
									className='text-xl font-semibold w-[50px] '
									disabled={quantityValue === 0}
									variant={"transparentBg"}
									onClick={() => {
										changeQuantityHandler(false);
									}}>
									<Minus size={20} />
								</Button>
								<span className='text-xl font-semibold p-2 min-w-[40px] text-center'>
									{quantityValue}
								</span>
								<Button
									className='text-xl font-semibold w-[50px] '
									disabled={currentRemainingQuantity === 0}
									variant={"transparentBg"}
									onClick={() => {
										changeQuantityHandler(true);
									}}>
									<Plus size={20} />
								</Button>
							</div>
							<Button
								className=''
								variant={"custom"}
								isLoading={isLoadingAddToCart}
								spinnerType='circular'
								disabled={isBtnDisabled || quantityValue === 0}
								onClick={addToCartHandler}>
								{!isLoadingAddToCart && <ShoppingCart size={20} />}
							</Button>
						</div>
						<div className='flex flex-col items-center space-y-2'>
							<h2 className='text-2xl font-semibold'>QR Code</h2>
							<span className='w-fit p-1 font-semibold rounded-lg bg-[#1725542b]'>
								{meta?.barcode}
							</span>
							<img
								className='w-[150px] h-[150px]  block object-fill'
								loading='lazy'
								src={meta?.qrCode}
								alt={meta?.barcode}
							/>
						</div>
					</div>
				</div>
			</Loading>
			<div className='w-full p-5 flex flex-col space-y-3'>
				<h2 className='text-3xl font-semibold'>Discussion</h2>
				<span className='w-full my-2 h-[1px] bg-[#1725547b]' />
				<div className='flex flex-col space-y-3'>
					{reviews?.map((review, idx) => (
						<div
							key={idx}
							className='flex flex-col space-y-2 border border-[#1725547b] rounded-lg p-3'>
							<div className='flex space-x-5 items-center border-b border-[#17255448] pb-1'>
								<img
									className='w-[30px] h-[30px] bg-[#f2f2f2] object-cover rounded-full cursor-pointer'
									loading='lazy'
									src={avatar}
									alt={review.reviewerName}
								/>
								<p className='text-lg font-semibold'>{review.reviewerName}</p>
								<p className='text-sm text-gray-700'>{review.date}</p>
							</div>
							<p className='text-lg ml-5'>{review.comment}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
