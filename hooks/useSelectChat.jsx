import { setDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase.config";
import { AuthContext } from "../store/context/AuthContext";
import { GlobalContext } from "../store/context/GlobalContext";
import toastNotify from "../util/toast";

const useSelectChat = () => {
	const { setChatInfos } = GlobalContext();
	const { currentUser } = AuthContext();

	const selectChatFun = async ({ userID, email, ...rest }) => {
		try {
			if (currentUser.uid === userID) {
				return toastNotify("error", "can't talk to yourself");
			}

			// check if chat already exist if not create
			const combinedID =
				currentUser.uid > userID
					? `${currentUser.uid}-and-${userID}`
					: `${userID}-and-${currentUser.uid}`;

			const docRef = doc(db, "chats", combinedID);

			const chat = await getDoc(docRef);

			if (chat.exists()) {
				// set chat here
				setChatInfos({
					chatID: combinedID,
					receiverID: userID,
				});
				return toastNotify("success", "Chat already exist");
			}

			const data = {
				createdAt: serverTimestamp(),
				owners: [
					{
						email: currentUser.email,
						img: currentUser.photoURL,
						userID: currentUser.uid,
						username: currentUser.displayName,
					},
					{
						userID,
						email,
						img: rest.img,
						username: rest.username,
					},
				],
				lastMessage: "",
			};

			await setDoc(docRef, data);

			setChatInfos({
				chatID: combinedID,
				receiverID: userID,
			});

			return toastNotify("success", `Chat created`);
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
		}
	};

	return { selectChatFun };
};

export default useSelectChat;
