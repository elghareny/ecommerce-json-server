/** @format */
import {HeaderIcon} from "@components/ecommerce";
import {getCartTotalQuantitySelector} from "@redux/cart/selectors";
import {useAppSelector} from "@redux/hooks";
import Cart from "@assets/svg/cart.svg?react";
import WishList from "@assets/svg/wishlist.svg?react";
import {Link} from "react-router-dom";

const NavIcons = () => {
	const cartTotalNum = useAppSelector(getCartTotalQuantitySelector);
	const wishlistTotalNum = useAppSelector(
		(state) => state.wishlist.itemsID.length,
	);
	return (
		<>
			<Link to={"/wishlist"}>
				<HeaderIcon
					icon={
						<WishList
							fill='#fff'
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
							fill='#fff'
							title='ecommerce cart'
						/>
					}
				/>
			</Link>
		</>
	);
};

export default NavIcons;
