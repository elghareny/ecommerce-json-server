/** @format */

import {ILoginInput, IRegisterInput} from "@interfaces/index";

export const RegisterFormData: IRegisterInput[] = [
	{
		id: "firstName",
		name: "firstName",
		type: "text",
		placeholder: "First Name",
	},
	{
		id: "lastName",
		name: "lastName",
		type: "text",
		placeholder: "Last Name",
	},
	{
		id: "email",
		name: "email",
		type: "email",
		placeholder: "Email Address",
	},
	{
		id: "password",
		name: "password",
		type: "password",
		placeholder: "Password",
	},
	{
		id: "confirmPassword",
		name: "confirmPassword",
		type: "password",
		placeholder: "Confirm Password",
	},
];

export const LoginFormData: ILoginInput[] = [
	{
		id: "email",
		name: "email",
		type: "email",
		placeholder: "Email Address",
	},
	{
		id: "password",
		name: "password",
		type: "password",
		placeholder: "Password",
	},
];
