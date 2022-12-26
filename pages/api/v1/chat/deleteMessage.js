import { db_admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../util/apiErrorHandler";
import isAuth from "../_isAuth";

const handler = async (req, res) => {
	// error out if method not allowed
	if (req.method !== "DELETE")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const currentUser = req.currentUser;
		const messageInfos = req.headers.message_infos;

		// error out if trying to delete other message
		if (currentUser?.email === messageInfos?.email)
			return apiErrorHandler(res, 400, "Cannot delete this message");

		const messageRef = db_admin
			.collection("chats")
			.doc(messageInfos?.chatID)
			.collection("messages")
			.doc(messageInfos?.docID);

		const message = await messageRef.get();

		if (message.exists) {
			await messageRef.delete();

			return res
				.status(200)
				.json({ success: true, message: "Message has been deleted" });
		}
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);
