import { db_admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../util/apiErrorHandler";
import isAuth from "../_isAuth";

const handler = async (req, res) => {
	// error out if method not allowed
	if (req.method !== "PATCH")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const currentUser = req.currentUser;
		const { followingUserID } = req.body;

		const docRef = db_admin
			.collection("users")
			.doc(followingUserID)
			.collection("followers")
			.doc(currentUser.uid);

		// check if currentUser already followed
		const isFollowed = await docRef.get();

		// follow if never followed before
		if (!isFollowed.exists) {
			const data = {
				userID: currentUser.userID,
				username: currentUser.username,
				email: currentUser.email,
				img: {
					profilePicture: currentUser.img.profilePicture,
				},
			};

			await docRef.set(data);
			return res.status(200).json({ success: true, message: "Follow" });
		}

		// unfollow if already followed
		await docRef.delete();
		return res.status(200).json({ success: true, message: "Unfollow" });
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);
