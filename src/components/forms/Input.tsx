/** @format */

import {forwardRef, InputHTMLAttributes, ReactNode} from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	icon1?: ReactNode;
	icon2?: ReactNode;
	iconClick?: () => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, IProps>(
	({className, icon1, icon2, iconClick, onBlur, ...props}, ref) => {
		return (
			<div className='relative'>
				<input
					ref={ref}
					className={`relative w-full p-1 border-2  rounded-lg text-[16px] focus:outline-none focus:border-2  ${className}`}
					{...props}
					onBlur={onBlur}
				/>
				{(icon1 || icon2) && (
					<div className='absolute right-0 top-1/2 -translate-y-1/2 h-full p-2'>
						<div className='flex space-x-2'>
							{icon2}
							<button
								onClick={iconClick}
								type='button'>
								{icon1}
							</button>
						</div>
					</div>
				)}
			</div>
		);
	},
);

export default Input;
