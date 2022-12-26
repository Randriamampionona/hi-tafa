import { useState } from "react";
import { GlobalContext } from "../store/context/GlobalContext";
import toastNotify from "../util/toast";
import axios from "axios";

const useDeleteMessage = () => {
	const {
		selectedChatInfos: { chatID },
	} = GlobalContext();
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteMessageFun = async (message) => {
		setIsDeleting(true);

		try {
			const fetch = await axios.delete("/api/v1/chat/deleteMessage", {
				message_infos: { chatID, ...message },
			});
			const result = fetch.data;

			if (result.success) {
				return toastNotify?.("success", result.message);
			}

			throw new Error("error", result.message);

			// const messageRef = doc(
			// 	db,
			// 	"chats",
			// 	chatID,
			// 	"messages",
			// 	message.docID
			// );

			// const isMessage = await getDoc(messageRef);

			// if (isMessage.exists()) {
			// 	await deleteDoc(messageRef);

			// 	toastNotify?.("success", "Message has been deleted");
			// }
		} catch (error) {
			toastNotify?.("error", error.message);
		} finally {
			setIsDeleting(false);
		}
	};

	return { isDeleting, deleteMessageFun };
};

export default useDeleteMessage;
