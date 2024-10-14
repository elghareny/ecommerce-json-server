/** @format */
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import products from "./products/productSlice";
import cart from "./cart/cartSlice";
import wishlist from "./wishlist/wishlistSlice";
import auth from "./auth/authSlice";
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

const rootPersistConfig = {
	key: "root",
	storage,
	wishlist: ["cart", "auth"],
};
const authPersistConfig = {
	key: "auth",
	storage,
	whiteList: ["user", "accessToken"],
};
const cartPersistConfig = {
	key: "cart",
	storage,
	whiteList: ["items"],
};

const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, auth),
	categories,
	products,
	cart: persistReducer(cartPersistConfig, cart),
	wishlist,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
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
