/** @format */

import {Footer, Nav} from "@components/shared";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
	return (
		<main className='flex flex-col'>
			<Nav />
			<div className='container w-full m-auto'>
				<Outlet />
			</div>
			<Footer />
		</main>
	);
};

export default MainLayout;
