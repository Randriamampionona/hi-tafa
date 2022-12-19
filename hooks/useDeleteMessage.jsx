import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../lib/firebase.config";
import { GlobalContext } from "../store/context/GlobalContext";
import toastNotify from "../util/toast";

const useDeleteMessage = () => {
	const {
		selectedChatInfos: { chatID },
	} = GlobalContext();
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteMessageFun = async (messageID) => {
		setIsDeleting(true);

		try {
			const messageRef = doc(db, "chats", chatID, "messages", messageID);

			const isMessage = await getDoc(messageRef);

			if (isMessage.exists()) {
				await deleteDoc(messageRef);

				toastNotify?.("success", "Message has been deleted");
			}
		} catch (error) {
			toastNotify?.("error", error.message);
		} finally {
			setIsDeleting(false);
		}
	};

	return { isDeleting, deleteMessageFun };
};

export default useDeleteMessage;
