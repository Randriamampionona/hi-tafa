const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

try {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
	});
} catch (error) {
	/*
	 * We skip the "already exists" message which is
	 * not an actual error when we're hot-reloading.
	 */
	if (!/already exists/u.test(error.message)) {
		console.error("Firebase admin initialization error", error.stack);
	}
}

const db_admin = admin.firestore();
const auth_admin = admin.auth();
const storage_admin = admin.storage();

export default admin;
export { db_admin, auth_admin, storage_admin };
