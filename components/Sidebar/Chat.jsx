import React from "react";
import Image from "next/image";
import { GlobalContext } from "../../store/context/GlobalContext";
import { AciveStatus } from "../common";
import useSelectChat from "../../hooks/useSelectChat";

const Chat = ({ chat }) => {
	const { toogleSidebar } = GlobalContext();
	const { selectChatFun } = useSelectChat();

	const selectChatHandler = async (selectedUser) => {
		toogleSidebar();
		await selectChatFun(selectedUser);
	};

	return (
		<div
			className="flex items-center gap-x-4 px-3 py-2 hover:bg-darkWhite/10"
			onClick={() => selectChatHandler(chat)}>
			<div className="relative">
				<Image
					src={chat.img}
					alt={chat.username}
					width={52}
					height={52}
					style={{ objectFit: "cover" }}
					className="rounded-full border-2 border-greenBlue"
				/>
				<AciveStatus isActive={chat.active} />
			</div>

			<div>
				<p className="text-base leading-none">{chat.username}</p>
				<h3 className="font-normal text-sm text-darkWhite cursor-default">
					Lorem ipsum dolor sit amet adipisicing...
				</h3>
			</div>
		</div>
	);
};

export default Chat;
