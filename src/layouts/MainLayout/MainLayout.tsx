/** @format */

import {Nav} from "@components/shared";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
	return (
		<main className='flex flex-col min-h-screen'>
			<Nav />
			<div className='container w-full mx-auto'>
				<Outlet />
			</div>
			{/* <Footer /> */}
		</main>
	);
};

export default MainLayout;
