import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../lib/firebase.config";
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
			const collectionRef = collection(db, "chats", chatID, "messages");

			if (chatID && data.msg.text !== "") {
				await addDoc(collectionRef, data);
				return toastNotify("success", "Message sent");
			}

			return toastNotify(
				"error",
				"Something went wrong, try again later"
			);
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
			setIsSending(false);
		}
	};

	return { sendMessageFunc, isSending };
};

export default useSendMessage;
