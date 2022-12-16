import { useEffect, useRef } from "react";
import { GlobalContext } from "../../store/context/GlobalContext";
import Message from "./Message";

const Chat = ({ messages }) => {
	const {
		selectedChatInfos: { chatID },
	} = GlobalContext();
	const scrollReff = useRef();

	useEffect(() => {
		scrollReff?.current?.scrollIntoView({
			behavior: "smooth",
			block: "end",
		});
	}, [messages?.length, chatID]);

	return (
		<div
			id="section__chat-box"
			className="flex-grow grid items-end gap-y-8 px-3 pt-3 pb-8 overflow-x-hidden"
			style={{ overflowY: "overlay" }}>
			{messages?.map((message) => (
				<Message key={message.messageID} {...message} />
			))}
			<div className="h-0 w-full" ref={scrollReff} />
		</div>
	);
};

export default Chat;
