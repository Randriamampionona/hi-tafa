/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { AuthContext } from "../../store/context/AuthContext";
import dateFormator from "./../../util/dateFormator";
import useDeleteMessage from "./../../hooks/useDeleteMessage";
import { useState } from "react";

const messageModel = {
	profileImg: "",
	email: "",
	msg: {
		text: "",
		media: null,
	},
	date: new Date().toString(),
};

const Message = ({ messageID, profileImg, email, msg, date }) => {
	const { currentUser } = AuthContext();
	const { isDeleting, deleteMessageFun } = useDeleteMessage();
	const [openDeleteBox, setOpenDeleteBox] = useState(false);

	const openBoxHandler = () => setOpenDeleteBox(true);

	const closeBoxHandler = () => setOpenDeleteBox(false);

	const deleteMessageHandler = async () => {
		await deleteMessageFun(messageID);
		closeBoxHandler();
	};

	return (
		<div
			className={`flex items-start gap-x-3 w-full px-2 ${
				email === currentUser?.email ? "justify-end" : "justify-start"
			} ${isDeleting ? "opacity-50" : "opacity-100"}`}>
			<Image
				src={profileImg}
				alt={email}
				width={32}
				height={32}
				style={{ objectFit: "cover" }}
				className={`rounded-full border-2 ${
					email === currentUser?.email
						? "order-2 border-greenBlue"
						: "order-1 border-darkBlue"
				}`}
			/>
			<div
				className={`max-w-[55%] ${
					email === currentUser?.email
						? "self-end justify-end order-1"
						: "self-start justify-start order-2"
				}`}
				onDoubleClick={openBoxHandler}>
				<div
					className={`text-start text-lightWhite ${
						msg?.media ? "p-1" : "p-4"
					} ${
						email === currentUser?.email
							? "bg-greenBlue rounded-senderRadius"
							: "bg-darkBlue rounded-reciverRadius"
					}`}>
					{msg?.media ? (
						<div className="space-y-2">
							<img
								loading="lazy"
								src={msg?.media}
								alt={msg?.media}
								style={{ objectFit: "cover" }}
								className="rounded-md"
							/>
							<p>{msg?.text}</p>
						</div>
					) : (
						<p>{msg?.text}</p>
					)}
				</div>
				<span className="text-darkBlue/70 text-xs">
					<i>{dateFormator?.(date)}</i>
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
