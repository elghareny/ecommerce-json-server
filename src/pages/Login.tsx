/** @format */

import FormElement from "@components/forms/FormElement";
import LabelError from "@components/forms/LabelError";
import Heading from "@components/shared/Heading";
import {LoginFormData} from "@data/index";

import {Eye, EyeOffIcon} from "lucide-react";
import error from "@assets/lottieFiles/error.json";
import {Navigate} from "react-router-dom";
import useLogin from "@hooks/useLogin";

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
				icon={
					name === "password" && (isPasswordVisible ? <Eye /> : <EyeOffIcon />)
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
		<div className='h-[calc(100vh-68px)] flex  flex-col justify-center items-center space-y-2'>
			<Heading title='Login To Your Account' />
			<form
				onSubmit={handleSubmit(submitFormHandler)}
				className='flex flex-col space-y-2 w-1/2 border-[3px] p-5 border-slate-400 rounded-lg'>
				{formDataRender}
				<button type='submit'>Login</button>
				{error && <LabelError>{error}</LabelError>}
			</form>
		</div>
	);
};

export default Login;
