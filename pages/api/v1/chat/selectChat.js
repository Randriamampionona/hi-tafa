import apiErrorHandler from "../../../../util/apiErrorHandler";
import isAuth from "./../_isAuth";
import admin, { db_admin } from "../../../../lib/firebaseAdmin.config";
import getOtherUser from "../../../../util/getOtherUser";

const handler = async (req, res) => {
	// error out if method not allowed
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const currentUser = req.currentUser;

		const { userID, email, img, username } = req.body;

		// return error if trying to talk to himself
		if (currentUser.userID === userID) {
			return apiErrorHandler(res, 406, "error", "can't talk to yourself");
		}

		// generate custome doc ID
		const combinedID =
			currentUser.userID > userID
				? `${currentUser.userID}-and-${userID}`
				: `${userID}-and-${currentUser.userID}`;

		// doc refs
		const chatRef = db_admin.collection("chats").doc(combinedID);

		// check if chat exist
		const chats = await chatRef.get();

		// return if chat already exist and set chat infos
		if (chats.exists) {
			// update last message (isSeen)
			await chatRef.update({
				["lastMessage.isSeen"]: true,
				createdAt: admin.firestore.FieldValue.serverTimestamp(),
			});

			// return chat infos
			return res.status(200).json({
				success: true,
				payload: {
					chatID: chats.data()?.chatID,
					receiverID: getOtherUser?.(
						chats.data()?.owners,
						req.currentUser
					)?.userID,
				},
			});
		}

		// create chat if never exist
		const chatData = {
			chatID: combinedID,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			owners: [
				{
					email: currentUser.email,
					img: currentUser.img.profilePicture,
					userID: currentUser.userID,
					username: currentUser.username,
				},
				{
					userID,
					email,
					img: img.profilePicture,
					username,
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
				when: admin.firestore.FieldValue.serverTimestamp(),
			},
		};

		await chatRef.set(chatData);

		// return chat infos
		return res.status(200).json({
			success: true,
			payload: {
				chatID: combinedID,
				receiverID: userID,
			},
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);
