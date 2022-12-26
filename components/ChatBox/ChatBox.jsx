import { Fragment, useEffect, useState } from "react";
import { ProfileBar } from "../common";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import UploadPopup from "./UploadPopup";
import { GlobalContext } from "../../store/context/GlobalContext";
import { AuthContext } from "../../store/context/AuthContext";
import NoChat from "./NoChat";
import {
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import { db } from "../../lib/firebase.config";
import dateFormator from "../../util/dateFormator";

const initChatState = {
	receiverData: null,
	messages: [],
	message: {
		text: "",
		media: null,
	},
};

const ChatBox = () => {
	const {
		isSidebarOpen,
		selectedChatInfos: { chatID, receiverID },
	} = GlobalContext();
	const { currentUser } = AuthContext();
	const [openPopup, setOpenPopup] = useState(false);
	const [chatData, setChatData] = useState(initChatState);
	const [inputMessage, setInputMessage] = useState(initChatState.message);

	// listen for receiver data
	useEffect(() => {
		const getReceiverData = () => {
			const docRef = doc(db, "users", receiverID);
			const unsub = onSnapshot(docRef, (snapshot) => {
				setChatData((prev) => ({
					...prev,
					receiverData: snapshot.data(),
				}));
			});

			return () => {
				unsub();
			};
		};

		receiverID && getReceiverData();
	}, [receiverID]);

	// listen for chat (messages) data
	useEffect(() => {
		const getReceiverData = () => {
			const docRef = collection(db, "chats", chatID, "messages");
			const q = query(docRef, orderBy("messageID", "asc"));
			const unsub = onSnapshot(q, (snapshot) => {
				setChatData((prev) => ({
					...prev,
					messages: snapshot.docs.map((doc) => ({
						...doc.data(),
						docID: doc.id,
						date: dateFormator(
							doc.data()?.date?.toDate().toString(),
							"default"
						),
					})),
				}));
			});

			return () => {
				unsub();
			};
		};

		chatID && getReceiverData();
	}, [chatID]);

	const resetInputMessage = () => {
		setInputMessage({
			text: "",
			media: null,
		});
	};

	return (
		<section
			className={`relative flex-grow flex-shrink grid grid-rows-asideGrid max-h-screen overflow-hidden text-darkBlue bg-[#e9ecee] sm:relative ${
				!isSidebarOpen ? "" : ""
			}`}>
			{currentUser && chatID && receiverID && chatData.receiverData ? (
				<Fragment>
					{openPopup && (
						<UploadPopup
							resetInputMessage={resetInputMessage}
							inputMessage={inputMessage}
							setInputMessage={setInputMessage}
							setOpenPopup={setOpenPopup}
						/>
					)}
					<ProfileBar
						email={chatData.receiverData?.email}
						username={chatData.receiverData?.username}
						profileImg={chatData.receiverData?.img.profilePicture}
						active={chatData.receiverData?.active}
						isChatBox
					/>
					<Chat messages={chatData.messages} />
					<ChatInput
						resetInputMessage={resetInputMessage}
						inputMessage={inputMessage}
						setInputMessage={setInputMessage}
						setOpenPopup={setOpenPopup}
					/>
				</Fragment>
			) : (
				<NoChat />
			)}
		</section>
	);
};

export default ChatBox;
