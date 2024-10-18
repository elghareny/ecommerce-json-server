/** @format */
import {ReactNode, useEffect, useState} from "react";

interface IProps {
	title: string;
	totalQuantity: number;
	icon?: ReactNode;
}
const HeaderIcon = ({totalQuantity, icon}: IProps) => {
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
		<div className=' cursor-pointer self-end flex space-x-1 items-center justify-center '>
			<div className='relative'>
				{icon}
				{totalQuantity > 0 && (
					<div
						className={`absolute -top-3 -right-2 w-5 h-5 text-xs font-semibold text-white  bg-slate-700 border rounded-full flex justify-center items-center ${
							isAnimate && "pump-cart-icon"
						}`}>
						{totalQuantity}
					</div>
				)}
			</div>
		</div>
	);
};

export default HeaderIcon;
