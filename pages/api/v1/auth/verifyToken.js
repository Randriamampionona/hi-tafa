import { auth_admin } from "../../../../lib/firebaseAdmin.config";

const handler = async (req, res) => {
	try {
		const user_token = req.headers[process.env.NEXT_PUBLIC_TOKEN_NAME];
		const token = await auth_admin.verifyIdToken(user_token);
		// const token = user_token === "123456"; just for testing

		if (token) {
			return res.status(200).json({ success: true, token, isAuth: true });
		}

		throw new Error("Error occured will verifying user token");
	} catch (error) {
		return res.status(401).json({ error: error.message, isAuth: false });
	}
};

export default handler;
