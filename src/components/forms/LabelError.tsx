/** @format */

import {ReactNode} from "react";

interface IProps {
	children: ReactNode;
	className?: string;
}

const LabelError = ({children, className}: IProps) => {
	return (
		<p className={`text-red-600 text-[14px] font-semibold ${className}`}>
			{children}
		</p>
	);
};

export default LabelError;
