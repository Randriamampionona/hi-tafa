import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase.config";
import { AuthContext } from "../../store/context/AuthContext";
import Chat from "./Chat";
import ProfileSlider from "./ProfileSlider";
import Search from "./Search";

const ChatList = () => {
	const { currentUser } = AuthContext();
	const [chatList, setChatList] = useState([]);
	const docRef = collection(db, "users");
	const q = query(docRef, where("userID", "!=", currentUser?.uid || ""));

	useEffect(
		() =>
			onSnapshot(q, (snapshot) => {
				setChatList(
					snapshot.docs.map((doc) => ({
						chatID: doc.id,
						...doc.data(),
					}))
				);
			}),
		[]
	);

	return (
		<div
			id="sidebar__chat-list"
			className="space-y-3"
			style={{ overflowY: "overlay" }}>
			<Search />
			<ProfileSlider chatList={chatList} />

			<div>
				{chatList.map((chat) => (
					<Chat key={chat.chatID} chat={chat} />
				))}
			</div>
		</div>
	);
};

export default ChatList;
