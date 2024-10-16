/** @format */

import Lottie from "lottie-react";
import NotFound from "@assets/lottieFiles/NotFound.json";
import error from "@assets/lottieFiles/error.json";
import shoppingEmpty from "@assets/lottieFiles/shoppingEmpty.json";
import shoppingLoad from "@assets/lottieFiles/shoppingLoad.json";
import placeOrderDone from "@assets/lottieFiles/placeOrderDone.json";
import cartSpinner from "@assets/lottieFiles/cartSpinner.json";

const lottieFilesMap = {
	shoppingLoad,
	shoppingEmpty,
	error,
	NotFound,
	placeOrderDone,
	cartSpinner,
};

interface IProps {
	type: keyof typeof lottieFilesMap;
	message?: string;
	className?: string;
}

const LottieHandler = ({type, message, className}: IProps) => {
	return (
		<div
			className={`p-5 w-full h-full flex flex-col items-center justify-center ${className}`}>
			<Lottie
				animationData={lottieFilesMap[type]}
				loop={true}
				style={
					type === "NotFound"
						? {width: "900px", height: "500px"}
						: {width: "700px", height: "400px"}
				}
			/>
			{message && (
				<h3
					className={`text-2xl font-semibold ${
						type === "error" && "text-red-600"
					}`}>
					{message}
				</h3>
			)}
		</div>
	);
};

export default LottieHandler;
