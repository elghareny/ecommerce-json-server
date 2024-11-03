/** @format */

import FormElement from "@components/forms/FormElement";
import LabelError from "@components/forms/LabelError";
import {LoginFormData} from "@data/index";
import {Eye, EyeOffIcon} from "lucide-react";
import {Navigate} from "react-router-dom";
import useLogin from "@hooks/useLogin";
import Button from "@components/shared/Button";

const Login = () => {
	// HOOK

	const {
		accessToken,
		error,
		formErrors,
		handleSubmit,
		loading,
		passwordClickHandler,
		register,
		submitFormHandler,
		isPasswordVisible,
	} = useLogin();
	// RENDER

	const formDataRender = LoginFormData.map((data, idx) => {
		const {id, name, placeholder, type} = data;
		return (
			<FormElement
				key={idx}
				id={id}
				name={name}
				placeholder={placeholder}
				type={
					name === "password" ? (isPasswordVisible ? "text" : "password") : type
				}
				register={register}
				error={formErrors[name]?.message}
				icon1={
					name === "password" &&
					(isPasswordVisible ? <Eye size={20} /> : <EyeOffIcon size={20} />)
				}
				passwordClickHandler={passwordClickHandler}
			/>
			// <div
			// 	key={idx}
			// 	className='flex flex-col'>
			// 	<label
			// 		className='text-xl font-semibold my-1'
			// 		htmlFor={name}>
			// 		{placeholder}
			// 	</label>
			// 	<input
			// 		className='p-2 border-[3px] border-slate-300 rounded-lg text-[19px] focus:outline-none focus:border-[3px] focus:border-slate-400'
			// 		placeholder={placeholder}
			// 		type={type}
			// 		name={name}
			// 		id={id}
			// 	/>
			// </div>
		);
	});

	if (accessToken) {
		return (
			<Navigate
				to={"/"}
				replace
			/>
		);
	}
	return (
		<div className='flex justify-center items-center'>
			<div className='my-5  lg:w-full flex justify-center items-center shadow-[0_2px_20px_3px_rgba(78,102,137,0.3)] rounded-lg'>
				<div className='hidden lg:block  rounded-l-lg '>
					<img
						loading='lazy'
						className='w-full h-full object-cover rounded-l-lg'
						src='/src/assets/E-commerce.webp'
						alt='register image'
					/>
				</div>
				<form
					onSubmit={handleSubmit(submitFormHandler)}
					className='flex flex-col  min-w-[300px] sm:min-w-[500px]  w-1/2  p-4 border-slate-400 rounded-lg lg:rounded-r-lg backdrop-blur-sm'>
					{formDataRender}
					<Button
						className='mt-2'
						variant={"custom"}
						type='submit'
						size={"sm"}
						isLoading={loading === "pending"}
						spinnerType='circular'
						disabled={loading === "pending"}>
						Login
					</Button>
					{error && <LabelError>{error}</LabelError>}
				</form>
			</div>
		</div>
	);
};

export default Login;
