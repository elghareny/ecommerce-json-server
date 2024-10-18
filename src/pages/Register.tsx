/** @format */

import FormElement from "@components/forms/FormElement";
import LabelError from "@components/forms/LabelError";
import Button from "@components/shared/Button";
import Heading from "@components/shared/Heading";
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
								<CircleAlert color='#f90101' />
							) : emailAvailabilityStatus === "available" ? (
								<CircleCheckBig color='#05f901' />
							) : (
								<CircleAlert color='#f90101' />
							)
						) : formErrors[name] ? (
							<CircleAlert color='#f90101' />
						) : (
							<CircleCheckBig color='#05f901' />
						)
					) : null
				}
				icon1={
					name === "password" ? (
						isPasswordVisible ? (
							<EyeOffIcon />
						) : (
							<Eye />
						)
					) : name === "confirmPassword" ? (
						isConfirmPasswordVisible ? (
							<EyeOffIcon />
						) : (
							<Eye />
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
		<div className='h-[calc(100vh-68px)] w-full flex  flex-col justify-center items-center space-y-2'>
			<Heading title='Create an Account' />
			<form
				className='flex flex-col  min-w-[400px]  max-w-1/2 shadow-[0_2px_20px_3px_rgba(78,102,137,0.3)] px-5 py-2 border-slate-400 rounded-lg'
				onSubmit={handleSubmit(submitFormHandler)}>
				{formDataRender}
				<Button
					className='mt-2'
					variant={"default"}
					size={"sm"}
					isLoading={loading === "pending"}
					disabled={
						emailAvailabilityStatus !== "available" || loading === "pending"
					}
					type='submit'>
					Sign Up
				</Button>
				{error && <LabelError>{error}</LabelError>}
			</form>
		</div>
	);
};

export default Register;
