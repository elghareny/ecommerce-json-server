/** @format */

import FormElement from "@components/forms/FormElement";
import LabelError from "@components/forms/LabelError";
import Button from "@components/shared/Button";
import {RegisterFormData} from "@data/index";
import useRegister from "@hooks/useRegister";
import {CircleAlert, CircleCheckBig, Eye, EyeOffIcon} from "lucide-react";
import {Navigate} from "react-router-dom";

const Register = () => {
	// HOOK

	const {
		error,
		loading,
		accessToken,
		register,
		handleSubmit,
		formErrors,
		passwordClickHandler,
		confirmPasswordClickHandler,
		emailAvailabilityStatus,
		submitFormHandler,
		emailOnBlurHandler,
		isPasswordVisible,
		isConfirmPasswordVisible,
		getFieldState,
	} = useRegister();

	// RENDER

	const formDataRender = RegisterFormData.map((data, idx) => {
		const {id, name, placeholder, type} = data;
		const {isDirty, invalid} = getFieldState(name);
		return (
			<FormElement
				key={idx}
				id={id}
				name={name}
				placeholder={placeholder}
				type={
					name === "password"
						? isPasswordVisible
							? "text"
							: "password"
						: name === "confirmPassword"
						? isConfirmPasswordVisible
							? "text"
							: "password"
						: type
				}
				register={register}
				error={
					name === "email"
						? formErrors["email"]?.message
							? formErrors["email"]?.message
							: emailAvailabilityStatus === "notAvailable"
							? "This email is already taken"
							: emailAvailabilityStatus === "failed" && "Error from server"
						: formErrors[name]?.message
				}
				success={
					name === "email"
						? !formErrors["email"]?.message
							? emailAvailabilityStatus === "available" &&
							  "This email is available for use"
							: ""
						: ""
				}
				icon2={
					invalid || isDirty ? (
						name === "email" ? (
							formErrors["email"]?.message ? (
								<CircleAlert
									size={20}
									color='#f90101'
								/>
							) : emailAvailabilityStatus === "available" ? (
								<CircleCheckBig
									size={20}
									color='#05f901'
								/>
							) : (
								<CircleAlert
									size={20}
									color='#f90101'
								/>
							)
						) : formErrors[name] ? (
							<CircleAlert
								size={20}
								color='#f90101'
							/>
						) : (
							<CircleCheckBig
								size={20}
								color='#05f901'
							/>
						)
					) : null
				}
				icon1={
					name === "password" ? (
						!isPasswordVisible ? (
							<EyeOffIcon size={20} />
						) : (
							<Eye size={20} />
						)
					) : name === "confirmPassword" ? (
						!isConfirmPasswordVisible ? (
							<EyeOffIcon size={20} />
						) : (
							<Eye size={20} />
						)
					) : null
				}
				passwordClickHandler={
					name === "password"
						? passwordClickHandler
						: confirmPasswordClickHandler
				}
				onBlur={name === "email" ? emailOnBlurHandler : () => {}}
				disabled={
					name === "email"
						? emailAvailabilityStatus === "checking" && true
						: false
				}
			/>
		);
		// return (
		// 	<div
		// 		key={idx}
		// 		className='flex flex-col space-y-1'>
		// 		<label
		// 			className='text-lg my-1'
		// 			htmlFor={name}>
		// 			{placeholder}
		// 		</label>
		// 		<Input
		// 			className={`${
		// 				errors[name]
		// 					? "border-red-400 focus:border-red-600"
		// 					: "border-slate-300 focus:border-slate-400"
		// 			} `}
		// 			placeholder={placeholder}
		// 			type={type}
		// 			id={id}
		// 			{...register(name)}
		// 		/>
		// 		{errors[name] && <LabelError>{errors[name].message}</LabelError>}
		// 	</div>
		// );
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
		<div className={` flex justify-center items-center`}>
			<div className='my-5 h-fit lg:w-full flex justify-center items-center shadow-[0_2px_20px_3px_rgba(78,102,137,0.3)] rounded-lg'>
				<div className='hidden lg:block  h-[calc(100vh-90px)]  rounded-l-lg '>
					<img
						loading='lazy'
						className='w-full h-full object-cover rounded-l-lg'
						src='/src/assets/E-commerce.webp'
						alt='register image'
					/>
				</div>
				<form
					className='flex flex-col  min-w-[300px] sm:min-w-[500px]  w-1/2 h-[calc(100vh-90px) p-4 border-slate-400 rounded-lg lg:rounded-r-lg backdrop-blur-sm'
					onSubmit={handleSubmit(submitFormHandler)}>
					{formDataRender}
					<Button
						className='mt-2'
						variant={"custom"}
						size={"sm"}
						isLoading={loading === "pending"}
						spinnerType='circular'
						disabled={
							emailAvailabilityStatus !== "available" || loading === "pending"
						}
						type='submit'>
						Sign Up
					</Button>
					{error && <LabelError>{error}</LabelError>}
				</form>
			</div>
		</div>
	);
};

export default Register;
