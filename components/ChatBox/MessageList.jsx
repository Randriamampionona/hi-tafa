import { useEffect, useRef } from "react";
import Message from "./Message";

const MessageList = ({ mockMessage }) => {
	const scrollReff = useRef();

	useEffect(() => {
		scrollReff?.current?.scrollIntoView({
			behavior: "smooth",
			block: "end",
		});
	}, [mockMessage]);

	return (
		<div
			id="section__chat-box"
			className="flex-grow grid gap-y-8 px-3 pt-3 pb-8"
			style={{ overflowY: "overlay" }}>
			{mockMessage?.map((message) => (
				<Message key={message.messageID} {...message} />
			))}
			<div ref={scrollReff} />
		</div>
	);
};

export default MessageList;