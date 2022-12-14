import axios from "axios";
import { useState } from "react";
import { GlobalContext } from "../store/context/GlobalContext";
import toastNotify from "../util/toast";

const useSendMessage = () => {
	const {
		selectedChatInfos: { chatID },
	} = GlobalContext();
	const [isSending, setIsSending] = useState(false);

	const sendMessageFunc = async (data) => {
		setIsSending(true);

		try {
			const fetch = await axios.post(
				"/api/v1/chat/sendMessage",
				{
					message: data,
				},
				{
					headers: { chat_id: chatID },
				}
			);
			const result = fetch.data;

			if (result.success) {
				return toastNotify("success", result.message);
			}

			// if error
			throw new Error(result.message);

			// const collectionRef = collection(db, "chats", chatID, "messages");
			// const lastMsgRef = doc(db, "chats", chatID);

			// if (chatID && (data.msg.text !== "" || data.msg.media)) {
			// 	// get last message ID
			// 	const getLastMessage = await getDoc(lastMsgRef);
			// 	const lastMessageID = getLastMessage.exists()
			// 		? Number(getLastMessage.data()?.lastMessage.messageID) + 1
			// 		: 1;

			// 	// sending message
			// 	await addDoc(collectionRef, {
			// 		...data,
			// 		messageID: lastMessageID,
			// 		date: serverTimestamp(),
			// 	});

			// 	// updating last message (isSeen, sender, message and messageID)
			// 	await updateDoc(lastMsgRef, {
			// 		lastMessage: {
			// 			messageID: lastMessageID,
			// 			sender: {
			// 				id: currentUser?.uid,
			// 				email: currentUser?.email,
			// 			},
			// 			message: data.msg.media ? "Photo" : data.msg.text,
			// 			isSeen: false,
			// 			when: serverTimestamp(),
			// 		},
			// 	});

			// 	return toastNotify("success", "Message sent");
			// }

			// return toastNotify(
			// 	"error",
			// 	"Something went wrong, try again later"
			// );
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
			setIsSending(false);
		}
	};

	return { sendMessageFunc, isSending };
};

export default useSendMessage;
