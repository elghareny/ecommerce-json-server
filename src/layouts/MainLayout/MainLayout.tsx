/** @format */

import {Footer, Nav} from "@components/shared";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
	return (
		<main className='flex flex-col'>
			<Nav />
			<div className='container w-full m-auto h-full'>
				<Outlet />
			</div>
			<Footer />
		</main>
	);
};

export default MainLayout;
