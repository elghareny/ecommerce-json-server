/** @format */

import {memo} from "react";
/** @format */

interface IProps {
	title: string;
}

const Heading = ({title}: IProps) => {
	return (
		<h2 className='sticky top-[68px] bg-white z-40 text-2xl font-semibold px-5 pt-2 pb-2'>
			{title}
		</h2>
	);
};

export default memo(Heading);
