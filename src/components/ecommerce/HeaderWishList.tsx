/** @format */

import {useEffect, useState} from "react";
import WishList from "@assets/svg/wishlist.svg?react";
import {useAppSelector} from "@redux/hooks";
const HeaderWishList = () => {
	const [isAnimate, setIsAnimate] = useState(false);
	const totalNum = useAppSelector((state) => state.wishlist.itemsID);

	useEffect(() => {
		if (!totalNum) return;
		setIsAnimate(true);
		const debounce = setTimeout(() => {
			setIsAnimate(false);
		}, 300);
		return () => {
			clearTimeout(debounce);
		};
	}, [totalNum]);
	return (
		<div className=' cursor-pointer self-end flex space-x-1 items-center justify-center border-r-[3px] pr-2'>
			<div className='relative'>
				<WishList
					fill='#fff'
					title='WishList'
				/>
				{totalNum.length > 0 && (
					<div
						className={`absolute -top-4 -right-2 w-6 h-6 text-sm font-semibold  bg-[var(--color-primary)] border rounded-full flex justify-center items-center ${
							isAnimate && "pump-cart-icon"
						}`}>
						{totalNum.length}
					</div>
				)}
			</div>
			<h3 className='text-xl font-semibold'>WishList</h3>
		</div>
	);
};

export default HeaderWishList;
