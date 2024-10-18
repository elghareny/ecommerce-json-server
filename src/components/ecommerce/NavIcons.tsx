/** @format */
import {HeaderIcon} from "@components/ecommerce";
import {getCartTotalQuantitySelector} from "@redux/cart/selectors";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import Cart from "@assets/svg/cart.svg?react";
import WishList from "@assets/svg/wishlist.svg?react";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {getWishlistItems} from "@redux/wishlist/wishlistSlice";

const NavIcons = () => {
	const dispatch = useAppDispatch();
	const cartTotalNum = useAppSelector(getCartTotalQuantitySelector);
	const wishlistTotalNum = useAppSelector(
		(state) => state.wishlist.itemsID.length,
	);
	const {accessToken} = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (accessToken) {
			dispatch(getWishlistItems("productsIds"));
		}
	}, [dispatch, accessToken]);

	return (
		<>
			<Link to={"/wishlist"}>
				<HeaderIcon
					icon={
						<WishList
							fill='#000'
							title='WishList'
						/>
					}
					title='WishList'
					totalQuantity={wishlistTotalNum}
				/>
			</Link>
			<Link to={"/cart"}>
				<HeaderIcon
					title='Cart'
					totalQuantity={cartTotalNum}
					icon={
						<Cart
							fill='#000'
							title='ecommerce cart'
						/>
					}
				/>
			</Link>
		</>
	);
};

export default NavIcons;
