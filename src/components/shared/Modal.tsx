/** @format */

import {X} from "lucide-react";
import React, {ReactNode} from "react";
import Button from "./Button";

interface IProps {
	modalHandler: () => void;
	isShowModal: boolean;
	title: string;
	children?: ReactNode;
	backdrop?: "static" | "hidden";
	// content?: string;
	// ModalBody?: ReactNode;
	// ModalFooter?: ReactNode;
	// btnTitle?: string;
	// btnClickHandler?: () => void;
}

const Modal = ({
	modalHandler,
	isShowModal,
	title,
	children,
	backdrop = "hidden",
}: // content,
// ModalBody,
// ModalFooter,
// btnTitle,
// btnClickHandler,
IProps) => {
	return (
		isShowModal && (
			<div className='fixed inset-0 z-[100] w-screen h-screen duration-300'>
				<div
					className='w-full h-full flex items-center justify-center bg-[#33333387] '
					onClick={backdrop === "hidden" ? modalHandler : () => {}}>
					<div
						className='flex flex-col items-start space-y-5 p-4 min-w-[300px]  bg-white rounded-lg'
						onClick={(e) => e.stopPropagation()}>
						<div className='w-full flex justify-between items-center border-b border-gray-500 pb-2 '>
							<h1 className='text-base font-semibold'>{title}</h1>
							<Button
								variant={"danger"}
								size={"sm"}
								className='p-1'
								onClick={modalHandler}>
								<X />
							</Button>
						</div>
						{children}
					</div>
				</div>
			</div>
		)
	);
};

interface IChildProps {
	children?: React.ReactNode;
}

Modal.Body = ({children}: IChildProps) => {
	return <div>{children}</div>;
};
Modal.Footer = ({children}: IChildProps) => {
	return (
		<div className='flex items-center justify-center space-x-2 w-full border-t border-gray-500  pt-3'>
			{children}
		</div>
	);
};

export default Modal;
