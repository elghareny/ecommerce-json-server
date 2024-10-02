/** @format */
import MainLayout from "@layouts/MainLayout/MainLayout";
import About from "@pages/About";
import Categories from "@pages/Categories";
import Error from "@pages/Error";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Products from "@pages/Products";
import Register from "@pages/Register";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path='/'
				element={<MainLayout />}
				errorElement={<Error />}>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path='/categories'
					element={<Categories />}
				/>
				<Route
					path='/products'
					element={<Products />}
				/>
				<Route
					path='/about'
					element={<About />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/register'
					element={<Register />}
				/>
			</Route>
		</>,
	),
);
