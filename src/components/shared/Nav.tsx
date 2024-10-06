/** @format */
import {HeaderCart} from "@components/ecommerce";
import {Link, NavLink} from "react-router-dom";

const Nav = () => {
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
		<nav className='sticky top-0 flex justify-center bg-[var(--dark-color)] p-5 text-[var(--light-color)]'>
			<div className='container flex justify-between items-center'>
				<div className='flex space-x-5'>
					<Link
						to='/'
						className='cursor-pointer space-x-2 text-lg font-semibold'>
						<span className='p-2 rounded-md text-[var(--light-color)] bg-[var(--color-primary)]'>
							Ecommerce
						</span>
					</Link>

					<ul className='flex space-x-3 md:space-x-5 text-lg font-semibold'>
						{navLinksRender}
					</ul>
				</div>
				<div className='flex space-x-5'>
					<Link to={"/cart"}>
						<HeaderCart />
					</Link>
					<ul className='flex space-x-3 md:space-x-5 text-lg font-semibold'>
						{navIconsRender}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
