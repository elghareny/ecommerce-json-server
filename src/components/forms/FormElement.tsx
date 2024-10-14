/** @format */

import Input from "./Input";
import LabelError from "./LabelError";
import {Path, FieldValues, UseFormRegister} from "react-hook-form";
import {ReactNode} from "react";

type TProps<TFiledValue extends FieldValues> = {
	error: string | undefined | false;
	success: string | undefined | false;
	placeholder: string;
	name: Path<TFiledValue>;
	id: string;
	type?: string;
	register: UseFormRegister<TFiledValue>;
	passwordClickHandler?: () => void;
	icon1?: ReactNode;
	icon2?: ReactNode;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	disabled?: boolean;
};

const FormElement = <TFiledValue extends FieldValues>({
	id,
	name,
	placeholder,
	type = "text",
	register,
	error,
	success,
	passwordClickHandler,
	icon1,
	icon2,
	onBlur,
	disabled,
}: TProps<TFiledValue>) => {
	const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		if (onBlur) {
			onBlur(e);
			register(name).onBlur(e);
		} else {
			register(name).onBlur(e);
		}
	};
	return (
		<div className='flex flex-col space-y-1'>
			<label
				className='text-lg my-1'
				htmlFor={name}>
				{placeholder}
			</label>
			<Input
				className={`${
					error
						? "border-red-400 focus:border-red-600"
						: " border-[#90be6d] focus:border-[#90be6d]"
				} `}
				placeholder={placeholder}
				type={type}
				id={id}
				{...register(name)}
				icon1={icon1}
				icon2={icon2}
				iconClick={passwordClickHandler}
				onBlur={onBlurHandler}
				disabled={disabled}
			/>
			{error && <LabelError>{error}</LabelError>}
			{success && <LabelError className='text-[#90be6d]'>{success}</LabelError>}
		</div>
	);
};

export default FormElement;
