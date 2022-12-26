import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { GlobalContext } from "../../store/context/GlobalContext";
import Message from "./Message";

const Chat = ({ messages }) => {
	const {
		selectedChatInfos: { chatID },
	} = GlobalContext();
	const { pathname } = useRouter();
	const scrollReff = useRef();

	// auto scroll to bottom
	useEffect(() => {
		const timiID = setTimeout(() => {
			scrollReff?.current?.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}, 100);

		return () => timiID;
	}, [messages?.length, chatID, pathname]);

	return (
		<div
			id="section__chat-box"
			className="flex-grow grid items-end space-y-8 px-3 pt-3 pb-8 overflow-x-hidden"
			style={{ overflowY: "overlay" }}>
			{messages?.map((message) => (
				<Message key={message.docID} message={message} />
			))}
			<div className="h-0 w-full" ref={scrollReff} />
		</div>
	);
};

export default Chat;
