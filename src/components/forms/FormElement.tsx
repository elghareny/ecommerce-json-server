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
		<div className='flex flex-col space-y-1 w-full'>
			<label
				className='text-base font-semibold my-1'
				htmlFor={name}>
				{placeholder}
			</label>
			<Input
				className={`${
					error
						? "border-red-400 focus:border-red-600"
						: " border-slate-300 focus:border-slate-400"
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
			{success && (
				<p className='text-[#90be6d] text-base font-semibold '>{success}</p>
			)}
		</div>
	);
};

export default FormElement;
