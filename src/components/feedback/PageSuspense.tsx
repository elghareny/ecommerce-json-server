/** @format */

import {ReactNode, Suspense} from "react";
import LottieHandler from "./LottieHandler/LottieHandler";

interface IProps {
	children: ReactNode;
}

const PageSuspense = ({children}: IProps) => {
	return (
		<Suspense
			fallback={
				<div className='h-screen flex items-center justify-center'>
					<LottieHandler type='shoppingLoad' />
				</div>
			}>
			{children}
		</Suspense>
	);
};

export default PageSuspense;
