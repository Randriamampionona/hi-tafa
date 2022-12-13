import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase.config";
import { AuthContext } from "../store/context/AuthContext";
import toastNotify from "../util/toast";

const useSelectChat = () => {
	const { currentUser } = AuthContext();

	const selectChatFun = async (userID, email) => {
		try {
			const docID = `${currentUser?.uid || ""}-AND-${userID}`;
			const docRef = doc(db, "chats", docID);

			const chat = await getDoc(docRef);

			if (chat.exists())
				return toastNotify("error", "Chat already exist");

			if (currentUser?.uid === userID)
				return toastNotify("error", "Can't talk with yourself");

			await setDoc(docRef, {
				owners: `${currentUser?.email || ""}-AND-${email}`,
				createdAt: new Date().toDateString(),
			});

			toastNotify("success", docID);
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
		}
	};

	return { selectChatFun };
};

export default useSelectChat;
