/** @format */

import {Link} from "react-router-dom";
import {ICategory} from "@interfaces/index";

interface IProps {
	category: ICategory;
}
const Category = ({category}: IProps) => {
	const {name, slug, url} = category;
	return (
		<div className='flex flex-col justify-between items-center p-2 border-2 border-slate-200 rounded-lg'>
			<Link to={`/products/${slug}`}>
				<div className='w-[150px] h-[150px] overflow-hidden rounded-[50%] bg[#f2f2f2]'>
					<img
						loading='lazy'
						className='w-full h-full object-cover border-[3px] rounded-full border-slate-200'
						src={url}
						alt={name}
					/>
				</div>
				<h4 className='text-center text-base font-semibold overflow-clip mt-3'>
					{name}
				</h4>
			</Link>
		</div>
	);
};

export default Category;
