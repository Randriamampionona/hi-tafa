import { GlobalContext } from "../store/context/GlobalContext";
import toastNotify from "../util/toast";
import axios from "axios";

const useSelectChat = () => {
	const { setChatInfos } = GlobalContext();

	const selectChatFun = async (choosenUser) => {
		try {
			const fetch = await axios.post(
				"/api/v1/chat/selectChat",
				choosenUser
			);
			const result = fetch.data;

			if (result.success) {
				return setChatInfos(result.payload);
			}

			throw new Error(result.message);

			// if (currentUser.uid === userID) {
			// 	return toastNotify("error", "can't talk to yourself");
			// }

			// // generate custome doc ID
			// const combinedID =
			// 	currentUser.uid > userID
			// 		? `${currentUser.uid}-and-${userID}`
			// 		: `${userID}-and-${currentUser.uid}`;

			// // doc refs
			// const chatRef = doc(db, "chats", combinedID);

			// const chats = await getDoc(chatRef);

			// // return if chat already exist and set chat infos
			// if (chats.exists()) {
			// 	// set chat here
			// 	setChatInfos({
			// 		chatID: chats.data()?.chatID,
			// 		receiverID: getOtherUser?.(
			// 			chats.data()?.owners,
			// 			currentUser
			// 		)?.userID,
			// 	});

			// 	// update last message (isSeen)
			// 	await updateDoc(chatRef, {
			// 		["lastMessage.isSeen"]: true,
			// 	});

			// 	return toastNotify("success", "Chat already exist");
			// }

			// // create chat if never exist
			// const chatData = {
			// 	chatID: combinedID,
			// 	createdAt: serverTimestamp(),
			// 	owners: [
			// 		{
			// 			email: currentUser.email,
			// 			img: currentUser.photoURL,
			// 			userID: currentUser.uid,
			// 			username: currentUser.displayName,
			// 		},
			// 		{
			// 			userID,
			// 			email,
			// 			img: profilePicture,
			// 			username,
			// 		},
			// 	],
			// 	lastMessage: {
			// 		messageID: 0,
			// 		sender: {
			// 			id: "",
			// 			email: "",
			// 		},
			// 		message: "",
			// 		isSeen: true,
			// 		when: serverTimestamp(),
			// 	},
			// };

			// await setDoc(chatRef, chatData);

			// // set chat infos after all
			// setChatInfos({
			// 	chatID: combinedID,
			// 	receiverID: userID,
			// });

			// return toastNotify("success", `Chat created`);
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
		}
	};

	return { selectChatFun };
};

export default useSelectChat;
