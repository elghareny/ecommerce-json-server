/** @format */
import {MoveLeft} from "lucide-react";
import {Link, useLocation, useNavigate} from "react-router-dom";

const Error = () => {
	const {pathname} = useLocation();
	const navigate = useNavigate();
	return (
		<div className='fixed inset-0 flex items-center justify-center p-5 w-full'>
			<div className='relative text-center'>
				<Link
					to='/'
					replace
					onClick={() => {
						navigate(-1);
					}}
					className='text-center absolute -top-32 -left-0 hover:bg-transparent dark:hover:text-black text-2xl '>
					<MoveLeft className='mr-2' /> Back
				</Link>

				<h1 className='mt-5 text-[36px] font-bold lg:text-9xl'>404</h1>
				<p className='mt-5 lg:text-2xl'>
					Oops something went wrong. Try to refresh this page or <br /> feel
					free to contact us if the problem presists.
				</p>
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
