/** @format */

interface IProps<T> {
	records: T[];
	renderItem: (record: T) => React.ReactNode;
}

const GridList = <T,>({records, renderItem}: IProps<T>) => {
	const GridListRender =
		records.length > 0
			? records.map((record) => {
					return renderItem(record);
			  })
			: "There are no records yet";

	return <>{GridListRender}</>;
};

export default GridList;
