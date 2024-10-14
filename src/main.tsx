/** @format */

import {createRoot} from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";
import {Provider} from "react-redux";
import {persistor, store} from "@redux/store";
import "@services/axios-global";
import {PersistGate} from "redux-persist/integration/react";
// import Loading from "./components/feedback/Loading";
// import {PersistGate} from "redux-persist/es/integration/react";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<PersistGate
			loading={null}
			persistor={persistor}>
			<RouterProvider router={router} />
		</PersistGate>
	</Provider>,
);
