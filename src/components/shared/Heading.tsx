/** @format */

import {memo} from "react";
/** @format */

interface IProps {
	title: string;
	className?: string;
}

const Heading = ({title, className}: IProps) => {
	return (
		<h2
			className={`bg-white z-40 text-2xl font-semibold px-5 pt-2 pb-2 ${className}`}>
			{title}
		</h2>
	);
};

export default memo(Heading);
