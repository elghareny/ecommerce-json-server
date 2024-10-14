/** @format */

import FormElement from "@components/forms/FormElement";
import LabelError from "@components/forms/LabelError";
import Heading from "@components/shared/Heading";
import {RegisterFormData} from "@data/index";
import {zodResolver} from "@hookform/resolvers/zod";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import {TRegisterFormInputs} from "@interfaces/index";
import {authRegister, resetUI} from "@redux/auth/authSlice";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {registerSchema} from "@validation/index";
import {CircleAlert, CircleCheckBig, Eye, EyeOffIcon} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {Navigate, useNavigate} from "react-router-dom";

const Register = () => {
	const dispatch = useAppDispatch();
	const {error, loading, accessToken} = useAppSelector((state) => state.auth);
	const navigate = useNavigate();
	// STATES
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState<boolean>(false);

	const {
		register,
		handleSubmit,
		trigger,
		getFieldState,
		formState: {errors},
	} = useForm<TRegisterFormInputs>({
		mode: "onBlur",
		resolver: zodResolver(registerSchema),
	});

	// HANDLERS

	const passwordClickHandler = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};
	const confirmPasswordClickHandler = () => {
		setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
	};

	const {
		checkEmailAvailability,
		emailAvailabilityStatus,
		enteredEmail,
		resetCheckEmailAvailability,
	} = useCheckEmailAvailability();
	const submitFormHandler: SubmitHandler<TRegisterFormInputs> = (data) => {
		const {firstName, lastName, email, password} = data;
		dispatch(authRegister({firstName, lastName, email, password}))
			.unwrap()
			.then(() => navigate("/login"));
	};

	const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
		const value = e.target.value;
		await trigger("email");
		const {isDirty, invalid} = getFieldState("email");
		if (isDirty && !invalid && enteredEmail !== value) {
			checkEmailAvailability(value);
			if (isDirty && invalid && enteredEmail) resetCheckEmailAvailability();
		}
	};

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
						? errors["email"]?.message
							? errors["email"]?.message
							: emailAvailabilityStatus === "notAvailable"
							? "This email is already taken"
							: emailAvailabilityStatus === "failed" && "Error from server"
						: errors[name]?.message
				}
				success={
					name === "email"
						? !errors["email"]?.message
							? emailAvailabilityStatus === "available" &&
							  "This email is available for use"
							: ""
						: ""
				}
				icon2={
					invalid || isDirty ? (
						name === "email" ? (
							errors["email"]?.message ? (
								<CircleAlert color='#f90101' />
							) : emailAvailabilityStatus === "available" ? (
								<CircleCheckBig color='#05f901' />
							) : (
								<CircleAlert color='#f90101' />
							)
						) : errors[name] ? (
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

	useEffect(() => {
		return () => {
			dispatch(resetUI());
		};
	}, [dispatch]);

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
			<Heading title='Create an Account' />
			<form
				className='flex flex-col space-y-2 w-1/2 border-[3px] p-5 border-slate-400 rounded-lg'
				onSubmit={handleSubmit(submitFormHandler)}>
				{formDataRender}
				<button
					type='submit'
					disabled={
						emailAvailabilityStatus !== "available" || loading === "pending"
					}>
					Sign Up
				</button>
				{error && <LabelError>{error}</LabelError>}
			</form>
		</div>
	);
};

export default Register;
