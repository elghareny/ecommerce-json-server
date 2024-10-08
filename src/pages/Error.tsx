/** @format */
import {Link, useLocation} from "react-router-dom";
import Lottie from "lottie-react";
import NotFound from "@assets/lottieFiles/NotFound.json";

const Error = () => {
	const {pathname} = useLocation();
	return (
		<div className='fixed inset-0 flex items-center justify-center p-5 w-full'>
			<div className='relative text-center'>
				<Lottie
					animationData={NotFound}
					loop={true}
					style={{width: "100%", height: "700px"}}
				/>

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
