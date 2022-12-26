/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { AuthContext } from "../../store/context/AuthContext";
import useDeleteMessage from "./../../hooks/useDeleteMessage";
import { useState } from "react";
import toastNotify from "../../util/toast";

// const messageModel = {
// 	profileImg: "",
// 	email: "",
// 	msg: {
// 		text: "",
// 		media: null,
// 	},
// };

const Message = ({ message }) => {
	const { currentUser } = AuthContext();
	const { isDeleting, deleteMessageFun } = useDeleteMessage();
	const [openDeleteBox, setOpenDeleteBox] = useState(false);

	const openBoxHandler = () => {
		currentUser?.email === message?.email && setOpenDeleteBox(true);
	};

	const closeBoxHandler = () => setOpenDeleteBox(false);

	const deleteMessageHandler = async () => {
		if (currentUser?.email === message?.email) {
			await deleteMessageFun(message);
			return closeBoxHandler();
		}

		return toastNotify("error", "Cannot delete this message");
	};

	return (
		<div
			className={`flex items-start gap-x-3 w-full px-2 ${
				message?.email === currentUser?.email
					? "justify-start flex-row-reverse"
					: "justify-start"
			} ${isDeleting ? "opacity-50" : "opacity-100"}`}>
			{/* sender img */}
			<div className="relative flex w-8 h-8">
				<Image
					src={message?.profileImg}
					alt={message?.email}
					width={32}
					height={32}
					style={{ objectFit: "cover" }}
					className={`rounded-full border-2 ${
						message?.email === currentUser?.email
							? "border-greenBlue"
							: "border-darkBlue"
					}`}
				/>
			</div>

			{/* message */}
			<div
				className={`max-w-[55%] ${
					message?.email === currentUser?.email
						? "self-end justify-end"
						: "self-start justify-start"
				}`}
				onDoubleClick={openBoxHandler}>
				<div
					className={`text-start text-lightWhite ${
						message?.msg?.media ? "p-1" : "p-4"
					} ${
						message?.email === currentUser?.email
							? "bg-greenBlue rounded-senderRadius"
							: "bg-darkBlue rounded-reciverRadius"
					}`}>
					{message?.msg?.media ? (
						<div>
							<img
								loading="lazy"
								src={message?.msg?.media}
								alt={message?.msg?.media}
								style={{ objectFit: "cover" }}
								className="rounded-md"
							/>
							<p className="mt-2">{message?.msg?.text}</p>
						</div>
					) : (
						<p>{message?.msg?.text}</p>
					)}
				</div>
				<span className="text-darkBlue/70 text-xs">
					<i>{message?.date}</i>
				</span>
			</div>

			{openDeleteBox && (
				<div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 p-3 rounded shadow-md bg-darkBlue">
					<h1 className="text-lightWhite font-semibold text-lg">
						Delete message?
					</h1>
					<p className="text-darkWhite font-medium">
						This message will be deleted from the chat and will
						won&apos;t be available for you and other user.
					</p>

					<div className="flex items-center justify-end space-x-2 w-full mt-5">
						<button
							className="outline-0 border-0 px-4 py-3 uppercase text-xs text-lightWhite rounded bg-darkWhite/10 hover:bg-blue-500/30"
							onClick={closeBoxHandler}>
							<span>cancel</span>
						</button>
						<button
							className="outline-0 border-0 px-4 py-3 uppercase text-xs text-lightWhite rounded bg-darkWhite/10 hover:bg-red-500/30"
							onClick={deleteMessageHandler}>
							<span>delete</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Message;
