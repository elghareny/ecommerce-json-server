/** @format */

import {loginSchema, registerSchema} from "@validation/index";
import {z} from "zod";

export interface ICategory {
	id?: number;
	slug: string;
	name: string;
	url: string;
}

export interface IProduct {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	tags: string[];
	brand: string;
	sku: string;
	weight: number;
	dimensions: {
		width: number;
		height: number;
		depth: number;
	};
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: string;
	reviews: {
		rating: number;
		comment: string;
		date: string;
		reviewerName: string;
		reviewerEmail: string;
	}[];
	returnPolicy: string;
	minimumOrderQuantity: number;
	meta: {
		createdAt: string;
		updatedAt: string;
		barcode: string;
		qrCode: string;
	};
	images: string[];
	thumbnail: string;
	quantity?: number;
	priceAfterDiscount?: number;
	isLiked?: boolean;
	isAuthenticated?: boolean;
}

export interface IOrderItem {
	id: number;

	subtotal: number;
	items: IProduct[];
}

// LOADING

export type TLoading = "idle" | "pending" | "succeeded" | "failed";

// REGISTER

export interface IRegisterInput {
	id: string;
	name: "firstName" | "lastName" | "email" | "password" | "confirmPassword";
	type: string;
	placeholder: string;
}

export type TRegisterFormInputs = z.infer<typeof registerSchema>;

// LOGIN

export interface ILoginInput {
	id: string;
	name: "email" | "password";
	type: string;
	placeholder: string;
}

export type TLoginFormInputs = z.infer<typeof loginSchema>;
