/** @format */

import {z} from "zod";

export const registerSchema = z
	.object({
		firstName: z.string().min(1, {message: "First name is required"}),
		lastName: z.string().min(1, {message: "Last name is required"}),
		email: z
			.string()
			.min(1, {message: "Email Address is required"})
			.email({message: "Invalid Email Address"}),
		password: z
			.string()
			.min(8, {message: "Password must be at least 8 characters long"})
			.regex(/.*[!@#$%^&*()_+{}|[\]\\:";<>?,./].*/, {
				message: "Password must contain at least one special character",
			}),
		confirmPassword: z.string().min(1, {
			message: "Confirm Password is required",
		}),
	})
	.refine((input) => input.password === input.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
/** @format */

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, {message: "Email Address is required"})
		.email({message: "Invalid Email Address"}),
	password: z.string().min(1, {message: "Password is required"}),
});
