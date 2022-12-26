import apiErrorHandler from "../../../../util/apiErrorHandler";
import isAuth from "./../_isAuth";
import admin, { db_admin } from "../../../../lib/firebaseAdmin.config";

const handler = async (req, res) => {
	// error out if method not allowed
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const {
			userID,
			email,
			img: { profilePicture },
		} = req.currentUser;

		const chatID = req.headers.chat_id;

		const { message } = req.body;

		const collectionRef = db_admin
			.collection("chats")
			.doc(chatID)
			.collection("messages");
		const lastMsgRef = db_admin.collection("chats").doc(chatID);

		const canSendMessage = chatID && (message.text !== "" || message.media);

		if (!canSendMessage)
			return apiErrorHandler(
				res,
				400,
				"Cannot send message, insufficient message details"
			);

		// get last message ID
		const getLastMessage = await lastMsgRef.get();
		const lastMessageID = getLastMessage.exists
			? Number(getLastMessage.data()?.lastMessage.messageID) + 1
			: 1;

		// sending message
		await collectionRef.add({
			profileImg: profilePicture,
			email,
			msg: {
				...message,
			},
			messageID: lastMessageID,
			date: admin.database.ServerValue.TIMESTAMP,
			date: admin.firestore.FieldValue.serverTimestamp(),
		});

		// updating last message (isSeen, sender, message and messageID)
		await lastMsgRef.update({
			lastMessage: {
				messageID: lastMessageID,
				sender: {
					id: userID,
					email,
				},
				message: message.media ? "Photo" : message.text,
				isSeen: false,
				when: admin.firestore.FieldValue.serverTimestamp(),
			},
		});

		return res.status(201).json({ success: true, message: "Message sent" });
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);
