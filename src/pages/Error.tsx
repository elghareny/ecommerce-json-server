/** @format */
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import {Link, useLocation} from "react-router-dom";

const Error = () => {
	const {pathname} = useLocation();
	return (
		<div className='fixed inset-0 flex items-center justify-center p-5 w-full'>
			<div className='relative text-center'>
				<LottieHandler type='NotFound' />

				<div className='flex justify-center mt-10 space-x-5'>
					<Link
						to={pathname}
						replace>
						<button
							className=''
							name='refresh'>
							Refresh
						</button>
					</Link>
					<Link
						to='/'
						replace>
						<button name='go-to-home'>Go To Home</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Error;
