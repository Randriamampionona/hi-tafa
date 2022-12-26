import { auth_admin, db_admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../util/apiErrorHandler";
import cookiesHandler from "../../../../util/cookiesHandler";

const handler = async (req, res) => {
    // error out if method not allowed
	if (req.method !== "POST")
    return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { username: displayName, email, password } = req.body;

		// create new user
		const newUser = await auth_admin.createUser({
			email,
			password,
			displayName,
			photoURL:
				"https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png",
		});

		// add the new created user to firestore db
		const docRef = db_admin.collection("users").doc(newUser?.uid);

		const data = {
			userID: newUser?.uid,
			username: newUser?.displayName,
			email: newUser?.email,
			img: {
				profilePicture: newUser?.photoURL,
				coverPhoto: newUser?.photoURL,
			},
			active: true,
			isBanned: false,
			joinedOn: serverTimestamp(),
		};

		await docRef.set(data);

		// set user token in cookie
		cookiesHandler().set({ req, res }, newUser.customClaims);

		return res.status(201).json({
			success: true,
			message: "User created successfully",
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default handler;
