import React from "react";
import Image from "next/image";
import { GlobalContext } from "../../store/context/GlobalContext";

const Chat = ({ chat }) => {
	const { toogleSidebar } = GlobalContext();

	return (
		<div
			className="flex items-center gap-x-4 px-3 py-2 hover:bg-darkWhite/10"
			onClick={() => toogleSidebar()}>
			<Image
				src={chat.img}
				alt={chat.username}
				width={52}
				height={52}
				placeholder="blur"
				blurDataURL={chat.img}
				style={{ objectFit: "cover" }}
				className="rounded-full border-2 border-greenBlue"
			/>

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
