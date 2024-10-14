/** @format */

import {useAppSelector} from "@redux/hooks";
import {ReactNode} from "react";
import {Navigate} from "react-router-dom";

interface IProps {
	children: ReactNode;
	data?: unknown;
}

const ProtectedRout = ({children, data}: IProps) => {
	const {accessToken} = useAppSelector((state) => state.auth);
	if (!accessToken) {
		return (
			<Navigate
				to={"/login"}
				replace
				state={data}
			/>
		);
	}
	return children;
};

export default ProtectedRout;
