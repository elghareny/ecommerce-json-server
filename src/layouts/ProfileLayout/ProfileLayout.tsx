/** @format */

import {NavLink, Outlet} from "react-router-dom";

const ProfileLayout = () => {
	return (
		<div className='grid grid-cols-[minmax(100px,_250px)_minmax(300px,_1fr)] w-full mt-2'>
			<aside className='w-full rounded-lg'>
				<ul className='w-full flex flex-col border rounded-md'>
					<NavLink
						className='border-b-2 p-2 rounded-t-md text-base'
						to='/profile'
						end>
						Account Info
					</NavLink>
					<NavLink
						className='p-2 rounded-b-md text-base'
						to='orders'>
						Orders
					</NavLink>
				</ul>
			</aside>
			<div className='w-full p-3'>
				<Outlet />
			</div>
		</div>
	);
};

export default ProfileLayout;
