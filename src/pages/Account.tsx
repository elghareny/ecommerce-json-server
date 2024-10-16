/** @format */

import Heading from "@components/shared/Heading";
import {useAppSelector} from "@redux/hooks";

const Account = () => {
	const {user} = useAppSelector((state) => state.auth);
	return (
		<>
			<Heading title='Account Page' />
			<h1 className='text-base font-semibold'>Welcome to your account page!</h1>
			<ul className=''>
				<li>
					Name : {user?.firstName} {user?.lastName}
				</li>
				<li>Email : {user?.email}</li>
			</ul>
		</>
	);
};

export default Account;
