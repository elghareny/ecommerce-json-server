/** @format */
import {NavIcons} from "@components/ecommerce";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {Link, NavLink} from "react-router-dom";
import DropDown from "./DropDown";
import Logo from "@assets/svg/cart-logo.svg?react";
import {ArrowBigRightDash, CircleX, Menu} from "lucide-react";
import {setFilterModal, setNavModal} from "@redux/shared/globalSlice";

const Nav = () => {
	const dispatch = useAppDispatch();
	const {isNavModal} = useAppSelector((state) => state.global);
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
			<li>
				<NavLink
					onClick={() => dispatch(setNavModal())}
					to={link.path}
					key={idx}
					className='cursor-pointer duration-300'>
					{link.name}
				</NavLink>
			</li>
		);
	});

	const navIconsRender = navIcons.map((link, idx) => {
		return (
			<NavLink
				onClick={() => dispatch(setNavModal())}
				to={link.path}
				key={idx}
				className='cursor-pointer duration-300'>
				{link.name}
			</NavLink>
		);
	});

	return (
		<nav
			className={`sticky top-0 z-50 w-full flex flex-col md:flex-row justify-center bg-slate-100 text-black px-4 py-2  shadow-[0_2px_15px_1px_rgba(78,102,137,0.3)] `}>
			<div className='container flex justify-between items-center'>
				<div className='flex items-center space-x-2  md:space-x-10'>
					<div className='block md:hidden'>
						<ArrowBigRightDash
							className='cursor-pointer'
							size={22}
							onClick={() => dispatch(setFilterModal())}
						/>
					</div>
					<Link
						to='/'
						className='cursor-pointer space-x-2 text-base font-semibold'>
						<span className='flex justify-center items-center'>
							<Logo className='w-8 h-8 mr-2' /> Shopfiy
						</span>
					</Link>

					<div className='hidden md:block '>
						<ul className=' links flex  space-x-2 md:space-x-3 text-base'>
							{navLinksRender}
						</ul>
					</div>
				</div>
				<div className='flex space-x-5'>
					<NavIcons />
					<div>
						{!accessToken ? (
							<ul className='hidden md:flex space-x-2 md:space-x-3 text-base '>
								{navIconsRender}
							</ul>
						) : (
							<DropDown user={user} />
						)}
					</div>
					<div className='block md:hidden'>
						{isNavModal ? (
							<CircleX
								className='cursor-pointer'
								size={20}
								onClick={() => dispatch(setNavModal())}
							/>
						) : (
							<Menu
								className='cursor-pointer'
								size={20}
								onClick={() => dispatch(setNavModal())}
							/>
						)}
					</div>
				</div>
			</div>

			<div
				className={`block md:hidden mt-2 transition-all duration-300 ease-linear ${
					isNavModal ? "opacity-100 " : "opacity-0 -translate-y-40 -z-10 h-0 "
				}`}>
				<ul className=' links text-base'>
					{navLinksRender}
					{!accessToken && (
						<ul className='flex flex-col text-base '>{navIconsRender}</ul>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
