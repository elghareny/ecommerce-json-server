/** @format */
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import products from "./products/productSlice";
import cart from "./cart/cartSlice";
import wishlist from "./wishlist/wishlistSlice";
import storage from "redux-persist/lib/storage";
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	persistReducer,
	persistStore,
} from "redux-persist";

const cartPersistConfig = {
	key: "cart",
	storage,
	whiteList: ["items"],
};
const wishlistPersistConfig = {
	key: "wishlist",
	storage,
	whiteList: ["itemsId"],
};

const rootReducer = combineReducers({
	categories,
	products,
	cart: persistReducer(cartPersistConfig, cart),
	wishlist: persistReducer(wishlistPersistConfig, wishlist),
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export {store, persistor};
