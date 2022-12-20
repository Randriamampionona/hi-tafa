import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GlobalContext } from "../../store/context/GlobalContext";
import { AciveStatus } from "../common";
import useSelectChat from "../../hooks/useSelectChat";
import getOtherUser from "../../util/getOtherUser";
import { AuthContext } from "../../store/context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase.config";
import dateFormator from "../../util/dateFormator";
import { FaBell } from "react-icons/fa";
import { useRouter } from "next/router";

const Chat = ({ chat }) => {
	const { toogleSidebar } = GlobalContext();
	const { currentUser } = AuthContext();
	const { selectChatFun } = useSelectChat();
	const { push } = useRouter();
	const [active, setActive] = useState(false);

	// get active status
	useEffect(() => {
		const getActiveStatus = () => {
			const userID = getOtherUser?.(chat?.owners, currentUser)?.userID;
			const docRef = doc(db, "users", userID);
			const unsub = onSnapshot(docRef, (snapshot) =>
				setActive(snapshot.data()?.active)
			);

			return () => {
				unsub();
			};
		};

		currentUser && chat?.chatID && getActiveStatus();
	}, [chat, currentUser]);

	const selectChatHandler = async (selectedUser) => {
		toogleSidebar();
		await selectChatFun(selectedUser);
		push("/");
	};

	return (
		<div
			className="relative flex items-center gap-x-4 px-3 py-2 hover:bg-darkWhite/10 cursor-default"
			onClick={() =>
				selectChatHandler(getOtherUser?.(chat?.owners, currentUser))
			}>
			<div className="relative flex w-[52px] h-[52px]">
				<Image
					src={getOtherUser?.(chat?.owners, currentUser)?.img}
					alt={getOtherUser?.(chat?.owners, currentUser)?.username}
					width={52}
					height={52}
					style={{ objectFit: "cover" }}
					className="rounded-full border-2 border-greenBlue"
				/>
				<AciveStatus isActive={active} />
			</div>

			<div>
				<p className="text-base leading-none">
					{getOtherUser?.(chat?.owners, currentUser)?.username}
				</p>
				{chat?.lastMessage?.message && (
					<div
						className={`flex items-center text-base leading-none ${
							chat?.lastMessage.isSeen
								? "text-darkWhite/70"
								: "text-lightWhite"
						}`}>
						<h3 className="font-normal text-sm text-darkWhite cursor-default">
							{chat?.lastMessage.message.length > 45
								? `${chat?.lastMessage.message.substring(
										0,
										42
								  )}...`
								: chat?.lastMessage.message}
						</h3>
						<small className="italic ml-2">
							&nbsp;•&nbsp;
							{dateFormator?.(
								chat?.lastMessage.when?.toDate()?.toString()
							)}
						</small>
					</div>
				)}
			</div>

			{!chat?.lastMessage.isSeen &&
				chat?.lastMessage.sender.id !== currentUser?.uid && (
					<span className="absolute top-1/2 -translate-y-1/2 right-3 text-lightWhite text-base">
						<FaBell />
					</span>
				)}
		</div>
	);
};

export default Chat;

// {
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
// 			img: rest.img,
// 			username: rest.username,
// 		},
// 	],
// 	lastMessage: {
// 		sender: {
// 			id: "",
// 			email: "",
// 		},
// 		message: "",
// 		isSeen: false,
// 		when: serverTimestamp(),
// 	},
// };
