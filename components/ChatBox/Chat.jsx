import { useEffect, useRef } from "react";
import Message from "./Message";

const Chat = ({ messages }) => {
	const scrollReff = useRef();

	useEffect(() => {
		scrollReff?.current?.scrollIntoView({
			behavior: "smooth",
			block: "end",
		});
	}, [messages]);

	return (
		<div
			id="section__chat-box"
			className="flex-grow grid items-end gap-y-8 px-3 pt-3 pb-8"
			style={{ overflowY: "overlay" }}>
			{messages?.map((message) => (
				<Message key={message.messageID} {...message} />
			))}
			<div ref={scrollReff} />
		</div>
	);
};

export default Chat;
