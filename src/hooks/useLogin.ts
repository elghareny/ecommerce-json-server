/** @format */

import {zodResolver} from "@hookform/resolvers/zod";
import {TLoginFormInputs} from "@interfaces/index";
import {authLogin, resetUI} from "@redux/auth/authSlice";
import {useAppDispatch, useAppSelector} from "@redux/hooks";
import {loginSchema} from "@validation/index";
import {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

const useLogin = () => {
	const dispatch = useAppDispatch();
	const {error, loading, accessToken} = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	// STATES

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: {errors: formErrors},
	} = useForm<TLoginFormInputs>({
		mode: "onBlur",
		resolver: zodResolver(loginSchema),
	});

	// HANDLER
	const passwordClickHandler = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};
	const submitFormHandler: SubmitHandler<TLoginFormInputs> = (data) => {
		const {email, password} = data;
		dispatch(authLogin({email, password}))
			.unwrap()
			.then(() => navigate("/"));
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
		submitFormHandler,
		passwordClickHandler,
		isPasswordVisible,
	};
};

export default useLogin;
