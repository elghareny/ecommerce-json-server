/** @format */
import {NavIcons} from "@components/ecommerce";
import {useAppSelector} from "@redux/hooks";
import {Link, NavLink} from "react-router-dom";
import DropDown from "./DropDown";

const Nav = () => {
	const {accessToken, user} = useAppSelector((state) => state.auth);

	const navLinks = [
		{name: "Categories", path: "/categories"},
		{name: "About", path: "/about"},
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
				className='cursor-pointer hover:text-[var(--color-primary)] duration-300'>
				{link.name}
			</NavLink>
		);
	});

	const navIconsRender = navIcons.map((link, idx) => {
		return (
			<NavLink
				to={link.path}
				key={idx}
				className='cursor-pointer hover:text-[var(--color-primary)] duration-300'>
				{link.name}
			</NavLink>
		);
	});
	return (
		<nav className='sticky top-0 z-50 w-full flex justify-center bg-[var(--dark-color)] p-4 text-[var(--light-color)]'>
			<div className='container flex justify-between items-center'>
				<div className='flex space-x-3'>
					<Link
						to='/'
						className='cursor-pointer space-x-2 text-base font-semibold'>
						<span className='p-2 rounded-md text-[var(--light-color)] bg-[var(--color-primary)]'>
							Ecommerce
						</span>
					</Link>

					<ul className='flex space-x-2 md:space-x-3 text-base font-semibold'>
						{navLinksRender}
					</ul>
				</div>
				<div className='flex space-x-5'>
					<NavIcons />
					{!accessToken ? (
						<ul className='flex space-x-2 md:space-x-3 text-base font-semibold'>
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
