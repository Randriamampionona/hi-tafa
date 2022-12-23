/* eslint-disable react-hooks/exhaustive-deps */
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase.config";
import { AuthContext } from "../../store/context/AuthContext";
import dateFormator from "../../util/dateFormator";
import getOtherUser from "../../util/getOtherUser";
import Chat from "./Chat";
import ProfileSlider from "./ProfileSlider";
import Search from "./Search";

const ChatList = () => {
	const { currentUser } = AuthContext();
	const [usersList, setUsersList] = useState([]);
	const [chatsList, setChatsList] = useState([]);

	// listen for users data
	useEffect(() => {
		const getUsers = () => {
			const docRef = collection(db, "users");
			const q = query(docRef, where("userID", "!=", currentUser.uid));

			const unsub = onSnapshot(q, (snapshot) => {
				setUsersList(
					snapshot.docs.map((doc) => ({
						...doc.data(),
					}))
				);
			});

			return () => {
				unsub();
			};
		};

		currentUser && getUsers();
	}, [currentUser]);

	// listen for chats data
	useEffect(() => {
		const getChats = () => {
			const collectionRef = collection(db, "chats");
			const q = query(collectionRef, orderBy("createdAt", "desc"));

			const unsub = onSnapshot(q, (snapshot) => {
				const chatsArrays = snapshot.docs.map((doc) => ({
					...doc.data(),
					lastMessage: {
						...doc.data().lastMessage,
						when: dateFormator(
							doc.data().lastMessage.when?.toDate().toString(),
							"ago"
						),
					},
				}));
				const filteredChats = chatsArrays?.filter((chat) => {
					if (
						!!chat.owners.find((o) => o.userID === currentUser?.uid)
					) {
						return chat;
					}
				});
				setChatsList(filteredChats);
			});

			return () => {
				unsub();
			};
		};

		currentUser && usersList.length && getChats();
	}, [currentUser, usersList]);

	return (
		<div
			id="sidebar__chat-list"
			className="relative space-y-3"
			style={{ overflowY: "overlay" }}>
			<Search />
			<ProfileSlider usersList={usersList} />

			<div>
				{chatsList.length ? (
					chatsList.map((chat) => (
						<Chat key={chat.chatID} chat={chat} />
					))
				) : (
					<span className="w-full text-center text-sm text-darkWhite px-3 mt-6">
						No chat yet, start a new one
					</span>
				)}
			</div>
		</div>
	);
};

export default ChatList;
