/** @format */

import {TLoading} from "@interfaces/index";

interface IProps {
	status: TLoading;
	error: null | string;
	children: React.ReactNode;
}

const Loading = ({status, error, children}: IProps) => {
	if (status === "pending") {
		return <p>Loading...</p>;
	}
	if (status === "failed") {
		return <p>{error}</p>;
	}
	return <>{children}</>;
};

export default Loading;
