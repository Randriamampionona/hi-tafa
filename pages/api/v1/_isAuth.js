import apiErrorHandler from "./../../../util/apiErrorHandler";
import { auth_admin, db_admin } from "../../../lib/firebaseAdmin.config";

const isAuth = (handler) => {
	return async (req, res) => {
		try {
			const userToken = req.cookies.user_token;
			const token = await auth_admin.verifyIdToken(userToken);

			if (token) {
				// get currentUser in user collection
				const docRef = db_admin.collection("users").doc(token.uid);
				const currentUser = await docRef.get();

				// error if account banned
				if (currentUser.data()?.isBanned)
					throw new error("Account banned");

				req.currentUser = {
					uid: token.uid,
					userID: token.uid,
					username: currentUser.data()?.username,
					email: token.email,
					img: {
						profilePicture: currentUser.data()?.img.profilePicture,
						coverPhoto: currentUser.data()?.img.coverPhoto,
					},
					active: currentUser.data()?.active,
					isBanned: currentUser.data()?.isBanned,
					joinedOn: currentUser.data()?.joinedOn,
				};
				// next
				return handler(req, res);
			}

			throw new Error("Unauthorized");
		} catch (error) {
			return apiErrorHandler(res, 401, error);
		}
	};
};

export default isAuth;
