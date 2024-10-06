/** @format */

import {createRoot} from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";
import {Provider} from "react-redux";
import {store} from "@redux/store";
import "@services/axios-global";
// import Loading from "./components/feedback/Loading";
// import {PersistGate} from "redux-persist/es/integration/react";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		{/* <PersistGate
			Loading={null}
			presistor={persistor}>
		</PersistGate> */}
		<RouterProvider router={router} />,
	</Provider>,
);
