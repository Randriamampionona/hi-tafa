import { useEffect, useRef } from "react";
import Message from "./Message";

const Chat = () => {
	const scrollReff = useRef();

	useEffect(() => {
		scrollReff?.current?.scrollIntoView({
			behavior: "smooth",
			block: "end",
		});
	}, []);

	return (
		<div
			id="section__chat-box"
			className="flex-grow grid gap-y-8 px-3 pt-3 pb-8"
			style={{ overflowY: "overlay" }}>
			{/* {mockMessage?.map((message) => (
				<Message key={message.messageID} {...message} />
			))} */}
			chat here
			<div ref={scrollReff} />
		</div>
	);
};

export default Chat;
