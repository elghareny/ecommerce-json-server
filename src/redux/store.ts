/** @format */
import {configureStore} from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import products from "./products/productSlice";
import cart from "./cart/cartSlice";
// import storage from "redux-persist/lib/storage";
// import persistReducer from "redux-persist/es/persistReducer";
// import persistStore from "redux-persist/es/persistStore";

// const rootPersistConfig = {
// 	key: "root",
// 	storage,
// 	whiteList: "cart",
// };

// const rootReducer = combineReducers({
// 	categories,
// 	products,
// 	cart,
// });

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
	reducer: {categories, products, cart},
});

// const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export {store};
