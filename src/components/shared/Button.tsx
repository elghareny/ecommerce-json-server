/** @format */

import {cva, VariantProps} from "class-variance-authority";
import {ButtonHTMLAttributes, ReactNode} from "react";
import {cn} from "@utils/index";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import Spinner from "./Spinner";

const buttonVariants = cva(
	"flex justify-center items-center rounded-md font-medium text-white duration-300 dark:text-black disabled:bg-[#286bfbae] disabled:hover:bg-[#286bfbae] disabled:cursor-not-allowed disabled:text-white",
	{
		variants: {
			variant: {
				// ** FILLED
				default:
					"bg-slate-900 dark:bg-[#225ad5] dark:text-white dark:hover:bg-[#286afb] disabled:bg-[#286bfb97] disabled:hover:bg-[#286bfb97] ",
				danger:
					"bg-red-900 dark:bg-[#c2344d] dark:text-white dark:hover:bg-red-700 disabled:bg-red-400 disabled:hover:bg-red-400",
				cancel:
					"bg-gray-300 text-gray-700 dark:bg-[#f5f5fa] dark:text-dark hover:bg-gray-400 dark:hover:bg-gray-300 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:text-black",
				custom:
					"bg-[#172554e0] hover:bg-[#172554] dark:bg-[#172554e0] dark:text-white dark:hover:bg-[#172554] disabled:bg-[#1725547b] disabled:hover:bg-[#1725547b] ",

				// ** OUTLINE
				outline:
					" hover:text-[#bfdbfe] bg-transparent text-[#bfdbfe] border-2 border-[[#172554]]hover:border-transparent hover:bg-[#172554c9] dark:text-gray-700 dark:hover:text-white disabled:bg-[#1725549f] disabled:hover:bg-[#1725549f]",
				transparentBg:
					"border-none hover:text-[#bfdbfe] bg-transparent text-[#bfdbfe] hover:bg-[#172554] dark:text-gray-700 dark:hover:text-white disabled:bg-[#1725549f] disabled:hover:bg-[#1725549f]",
			},
			size: {
				default: "p-3",
				sm: "text-sm px-4 py-2",
			},
			fullWidth: {
				true: "w-full",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface IProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	name?: string;
	className?: string;
	children: ReactNode;
	isLoading?: boolean;
	type?: "submit" | "button" | "reset";
	spinnerType?: "circular" | "chart";
}

const Button = ({
	variant,
	size,
	fullWidth,
	children,
	type,
	className,
	isLoading,
	name,
	spinnerType = "chart",
	...props
}: IProps) => {
	return (
		<button
			name={name}
			type={type}
			className={cn(buttonVariants({variant, size, fullWidth, className}))}
			disabled={isLoading}
			{...props}>
			{isLoading &&
				(spinnerType === "chart" ? (
					<LottieHandler
						type='cartSpinner'
						className='w-0 h-0 p-0 mr-5'
					/>
				) : (
					<Spinner className='text-white mr-2' />
				))}
			{children}
		</button>
	);
};

export default Button;
