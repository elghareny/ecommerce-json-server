/** @format */

import {X} from "lucide-react";
import {ReactNode} from "react";

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
						className='flex flex-col items-start space-y-3 p-4 min-w-[300px] max-h-screen bg-white rounded-lg'
						onClick={(e) => e.stopPropagation()}>
						<div className='w-full flex justify-between items-center border-b border-gray-500 pb-2 '>
							<h1 className='text-base font-semibold'>{title}</h1>
							<button onClick={modalHandler}>
								<X />
							</button>
						</div>
						{children}
						{/* {content && <p className='text-base my-3'>{content}</p>}
						{ModalBody}
						<div className='flex items-center space-x-3 w-full'>
							{ModalFooter}
							{btnTitle && (
								<button onClick={btnClickHandler}>{btnTitle}</button>
							)}
							<button onClick={modalHandler}>Cancel</button>
						</div> */}
					</div>
				</div>
			</div>
		)
	);
};

Modal.Body = ({children}) => {
	return <div>{children}</div>;
};
Modal.Footer = ({children}) => {
	return (
		<div className='flex items-center justify-center space-x-2 w-full border-t border-gray-500 py-1'>
			{children}
		</div>
	);
};

export default Modal;
