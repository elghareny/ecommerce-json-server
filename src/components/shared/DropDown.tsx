/** @format */

import {authLogout} from "@redux/auth/authSlice";
import {useAppDispatch} from "@redux/hooks";
import {ArrowDownToLineIcon} from "lucide-react";
import {useState} from "react";
import {Link} from "react-router-dom";

interface IProps {
	user: {id: number; firstName: string; lastName: string; email: string} | null;
}
const DropDown = ({user}: IProps) => {
	const dispatch = useAppDispatch();
	const [dropDown, setDropDown] = useState(false);

	return (
		<div className='relative'>
			<div className='p2'>
				<button
					className='flex items-center space-x-1 text-white'
					onClick={() => setDropDown(!dropDown)}>
					<h2>
						{user?.firstName} {user?.lastName}
					</h2>
					<ArrowDownToLineIcon size={20} />
				</button>
			</div>
			{dropDown && (
				<div className='absolute bg-[#333] rounded-lg top-10 right-0'>
					<ul className='flex flex-col justify-start items-center space-y-2 p-2'>
						<Link
							to={"/profile"}
							onClick={() => setDropDown(false)}
							className='w-full py-1 pl-3 pr-8 rounded-lg hover:bg-slate-700 duration-300'>
							Profile
						</Link>
						<Link
							to={"/"}
							className='w-full py-1 pl-3 pr-8 rounded-lg hover:bg-slate-700 duration-300'
							onClick={() => {
								dispatch(authLogout());
								setDropDown(false);
							}}>
							Logout
						</Link>
					</ul>
				</div>
			)}
		</div>
	);
};

export default DropDown;
