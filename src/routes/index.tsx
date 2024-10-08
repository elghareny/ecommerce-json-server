/** @format */
import Error from "@pages/Error";
import {lazy, Suspense} from "react";
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const About = lazy(() => import("@pages/About"));
const Cart = lazy(() => import("@pages/Cart"));
const Categories = lazy(() => import("@pages/Categories"));
const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const Products = lazy(() => import("@pages/Products"));
const Register = lazy(() => import("@pages/Register"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
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
				element={
					<Suspense fallback='loading please wait ...'>
						<MainLayout />
					</Suspense>
				}
				errorElement={<Error />}>
				<Route
					index
					element={
						<Suspense fallback='loading please wait ...'>
							<Home />
						</Suspense>
					}
				/>
				<Route
					path='/categories'
					element={
						<Suspense fallback='loading please wait ...'>
							<Categories />
						</Suspense>
					}
				/>
				<Route
					path='/products/:slug'
					element={
						<Suspense fallback='loading please wait ...'>
							<Products />
						</Suspense>
					}
					loader={({params}) => {
						if (typeof params.slug !== "string") {
							throw new Response("Bad Request", {
								statusText: "Category Not Found",
								status: 400,
							});
						}
						return true;
					}}
				/>
				<Route
					path='/about'
					element={
						<Suspense fallback='loading please wait ...'>
							<About />
						</Suspense>
					}
				/>
				<Route
					path='/cart'
					element={
						<Suspense fallback='loading please wait ...'>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					path='/wishlist'
					element={
						<Suspense fallback='loading please wait ...'>
							<Wishlist />
						</Suspense>
					}
				/>
				<Route
					path='/login'
					element={
						<Suspense fallback='loading please wait ...'>
							<Login />
						</Suspense>
					}
				/>
				<Route
					path='/register'
					element={
						<Suspense fallback='loading please wait ...'>
							<Register />
						</Suspense>
					}
				/>
			</Route>
		</>,
	),
);
