import {
	setDoc,
	doc,
	getDoc,
	updateDoc,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase.config";
import { AuthContext } from "../store/context/AuthContext";
import { GlobalContext } from "../store/context/GlobalContext";
import toastNotify from "../util/toast";
import getOtherUser from "./../util/getOtherUser";

const useSelectChat = () => {
	const { setChatInfos } = GlobalContext();
	const { currentUser } = AuthContext();

	const selectChatFun = async ({ userID, email, ...rest }) => {
		try {
			if (currentUser.uid === userID) {
				return toastNotify("error", "can't talk to yourself");
			}

			// generate doc ID
			const combinedID =
				currentUser.uid > userID
					? `${currentUser.uid}-and-${userID}`
					: `${userID}-and-${currentUser.uid}`;

			// doc refs
			const chatRef = doc(db, "chats", combinedID);

			const chats = await getDoc(chatRef);

			// return if chat already exist and set chat infos
			if (chats.exists()) {
				// set chat here
				setChatInfos({
					chatID: chats.data()?.chatID,
					receiverID: getOtherUser?.(
						chats.data()?.owners,
						currentUser
					)?.userID,
				});

				// update last message (isSeen)
				await updateDoc(chatRef, {
					["lastMessage.isSeen"]: true,
				});

				return toastNotify("success", "Chat already exist");
			}

			// create chat if never exist
			const chatData = {
				chatID: combinedID,
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
						img: rest.img.profilePicture,
						username: rest.username,
					},
				],
				lastMessage: {
					messageID: 0,
					sender: {
						id: "",
						email: "",
					},
					message: "",
					isSeen: true,
					when: serverTimestamp(),
				},
			};

			await setDoc(chatRef, chatData);

			// set chat infos after all
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
