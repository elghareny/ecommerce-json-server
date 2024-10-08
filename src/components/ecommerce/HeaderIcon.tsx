/** @format */
import {ReactNode, useEffect, useState} from "react";

interface IProps {
	title: string;
	totalQuantity: number;
	icon?: ReactNode;
}
const HeaderIcon = ({totalQuantity, title, icon}: IProps) => {
	// STATES

	const [isAnimate, setIsAnimate] = useState(false);

	useEffect(() => {
		if (!totalQuantity) return;
		setIsAnimate(true);
		const debounce = setTimeout(() => {
			setIsAnimate(false);
		}, 300);

		return () => {
			clearTimeout(debounce);
		};
	}, [totalQuantity]);
	return (
		<div className=' cursor-pointer self-end flex space-x-2 items-center justify-center border-r-[3px] pr-2'>
			<div className='relative'>
				{icon}
				{totalQuantity > 0 && (
					<div
						className={`absolute -top-4 -right-2 w-6 h-6 text-sm font-semibold  bg-[var(--color-primary)] border rounded-full flex justify-center items-center ${
							isAnimate && "pump-cart-icon"
						}`}>
						{totalQuantity}
					</div>
				)}
			</div>
			<h3 className='text-xl font-semibold'>{title}</h3>
		</div>
	);
};

export default HeaderIcon;
