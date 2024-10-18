/** @format */
import {NavIcons} from "@components/ecommerce";
import {useAppSelector} from "@redux/hooks";
import {Link, NavLink} from "react-router-dom";
import DropDown from "./DropDown";
import Logo from "@assets/svg/cart-logo.svg?react";

const Nav = () => {
	const {accessToken, user} = useAppSelector((state) => state.auth);

	const navLinks = [
		{name: "Home", path: "/"},
		{name: "Categories", path: "/categories"},
	];
	const navIcons = [
		{name: "Login", path: "/login"},
		{name: "Register", path: "/register"},
	];

	// RENDER

	const navLinksRender = navLinks.map((link, idx) => {
		return (
			<NavLink
				to={link.path}
				key={idx}
				className='cursor-pointer hover:text-indigo-600 duration-300'>
				{link.name}
			</NavLink>
		);
	});

	const navIconsRender = navIcons.map((link, idx) => {
		return (
			<NavLink
				to={link.path}
				key={idx}
				className='cursor-pointer hover:text-indigo-600 duration-300'>
				{link.name}
			</NavLink>
		);
	});

	return (
		<nav className='sticky top-0 z-50 w-full flex justify-center bg-slate-100 text-black px-4 py-2 border-b-2  '>
			<div className='container flex justify-between items-center'>
				<div className='flex items-center space-x-10'>
					<Link
						to='/'
						className='cursor-pointer space-x-2 text-base font-semibold'>
						<span className='flex justify-center items-center'>
							<Logo className='w-8 h-8 mr-2' /> Shopfiy
						</span>
					</Link>

					<ul className='links flex space-x-2 md:space-x-3 text-base'>
						{navLinksRender}
					</ul>
				</div>
				<div className='flex space-x-5'>
					<NavIcons />
					{!accessToken ? (
						<ul className='flex space-x-2 md:space-x-3 text-base '>
							{navIconsRender}
						</ul>
					) : (
						<DropDown user={user} />
					)}
				</div>
			</div>
		</nav>
	);
};

export default Nav;
