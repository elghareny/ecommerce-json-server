/** @format */

import {ReactNode} from "react";

interface IProps {
	children: ReactNode;
	className?: string;
}

const LabelError = ({children, className}: IProps) => {
	return (
		<p className={`text-red-600 text-base font-semibold ${className}`}>
			{children}
		</p>
	);
};

export default LabelError;