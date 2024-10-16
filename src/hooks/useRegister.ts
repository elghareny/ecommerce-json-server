/** @format */

import {zodResolver} from "@hookform/resolvers/zod";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import {TRegisterFormInputs} from "@interfaces/index";
import {authRegister, resetUI} from "@redux/auth/authSlice";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {registerSchema} from "@validation/index";
import React, {useEffect, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {useNavigate} from "react-router-dom";

const useRegister = () => {
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
		formState: {errors: formErrors},
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

	useEffect(() => {
		return () => {
			dispatch(resetUI());
		};
	}, [dispatch]);

	return {
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
	};
};

export default useRegister;
