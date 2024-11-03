/** @format */
import ProtectedRout from "@components/auth/ProtectedRout";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import PageSuspense from "@components/feedback/PageSuspense";
import Error from "@pages/Error";
import {lazy, Suspense} from "react";
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const ProfileLayout = lazy(
	() => import("@layouts/ProfileLayout/ProfileLayout"),
);
const About = lazy(() => import("@pages/About"));
const Cart = lazy(() => import("@pages/Cart"));
const Categories = lazy(() => import("@pages/Categories"));
const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const Products = lazy(() => import("@pages/Products"));
const Register = lazy(() => import("@pages/Register"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Account = lazy(() => import("@pages/Account"));
const Orders = lazy(() => import("@pages/Orders"));
const ProductDetails = lazy(() => import("@pages/ProductDetails"));

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
					<Suspense
						fallback={
							<div className='h-screen flex items-center justify-center'>
								<LottieHandler type='shoppingLoad' />{" "}
							</div>
						}>
						<MainLayout />
					</Suspense>
				}
				errorElement={<Error />}>
				<Route
					index
					element={
						<PageSuspense>
							<Home />
						</PageSuspense>
					}
				/>
				<Route
					path='/categories'
					element={
						<PageSuspense>
							<Categories />
						</PageSuspense>
					}
				/>
				<Route
					path='/products/:slug'
					element={
						<PageSuspense>
							<Products />
						</PageSuspense>
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
					path='/productsDetails/:id'
					element={
						<PageSuspense>
							<ProductDetails />
						</PageSuspense>
					}
				/>
				<Route
					path='/about'
					element={
						<PageSuspense>
							<About />
						</PageSuspense>
					}
				/>
				<Route
					path='/cart'
					element={
						<PageSuspense>
							<Cart />
						</PageSuspense>
					}
				/>
				<Route
					path='/wishlist'
					element={
						<ProtectedRout>
							<PageSuspense>
								<Wishlist />
							</PageSuspense>
						</ProtectedRout>
					}
				/>
				<Route
					path='/login'
					element={
						<PageSuspense>
							<Login />
						</PageSuspense>
					}
				/>
				<Route
					path='/register'
					element={
						<PageSuspense>
							<Register />
						</PageSuspense>
					}
				/>
				<Route
					path='profile'
					element={
						<ProtectedRout>
							<PageSuspense>
								<ProfileLayout />
							</PageSuspense>
						</ProtectedRout>
					}>
					<Route
						index
						element={
							<PageSuspense>
								<Account />
							</PageSuspense>
						}
					/>
					<Route
						path='orders'
						element={
							<PageSuspense>
								<Orders />
							</PageSuspense>
						}
					/>
				</Route>
			</Route>
		</>,
	),
);
