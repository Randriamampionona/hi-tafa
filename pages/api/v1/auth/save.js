import apiErrorHandler from "./../../../../util/apiErrorHandler";
import admin, { db_admin } from "../../../../lib/firebaseAdmin.config";

const handler = async (req, res) => {
	// error out if method not allowed
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { newCreatedUserInfos } = req.body;

		const docRef = db_admin
			.collection("users")
			.doc(newCreatedUserInfos?.user?.uid);

		// check if user already exist
		const user = await docRef.get();

		// if exist, update active status
		if (user.exists) {
			await docRef.update({
				active: true,
			});

			return res.status(200).json({ success: true });
		}

		// if does't exist, add
		const data = {
			userID: newCreatedUserInfos?.user?.uid,
			username: newCreatedUserInfos?.user?.displayName,
			email: newCreatedUserInfos?.user?.email,
			img: {
				profilePicture: newCreatedUserInfos?.user?.photoURL,
				coverPhoto: newCreatedUserInfos?.user?.photoURL,
			},
			active: true,
			isBanned: false,
			joinedOn: admin.firestore.FieldValue.serverTimestamp(),
		};

		await docRef.set(data);

		return res.status(204).json({ success: true });
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default handler;
