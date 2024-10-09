/** @format */

import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";

interface IProps<T> {
	records: T[];
	renderItem: (record: T) => React.ReactNode;
	emptyMessage: string;
}

const GridList = <T,>({records, renderItem, emptyMessage}: IProps<T>) => {
	const GridListRender =
		records.length > 0 ? (
			records.map((record) => {
				return renderItem(record);
			})
		) : (
			<LottieHandler
				type='shoppingEmpty'
				message={emptyMessage}
			/>
		);

	return <>{GridListRender}</>;
};

export default GridList;
