import { auth_admin } from "../../../../lib/firebaseAdmin.config";

const handler = async (req, res) => {
	try {
		const user_token = req.headers[process.env.NEXT_PUBLIC_TOKEN_NAME];
		const token = await auth_admin.verifyIdToken(user_token);

		if (token) {
			return res.status(200).json({ success: true, token });
		}

		throw new Error("Error occured will verifying user token");
	} catch (error) {
		return res.status(401).json({ error: error.message });
	}
};

export default handler;