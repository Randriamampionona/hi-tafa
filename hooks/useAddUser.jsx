import toastNotify from "../util/toast";
import axios from "axios";

const useAddUser = () => {
	const addUserFunc = async (result) => {
		try {
			const fetch = await axios.post("/api/v1/auth/save", {
				newCreatedUserInfos: result,
			});
			const response = fetch.data;

			if (response.error)
				throw new Error("Error occured while saving new user");

			// const docRef = doc(db, "users", result?.user?.uid);

			// // check if user already exist
			// const user = await getDoc(docRef);

			// // if exist, update
			// if (user?.exists()) {
			// 	return await updateDoc(docRef, {
			// 		active: true,
			// 	});
			// }

			// // if does't exist, add
			// const data = {
			// 	userID: result?.user?.uid,
			// 	username: result?.user?.displayName,
			// 	email: result?.user?.email,
			// 	img: {
			// 		profilePicture: result?.user?.photoURL,
			// 		coverPhoto: result?.user?.photoURL,
			// 	},
			// 	active: true,
			// 	isBanned: false,
			// 	joinedOn: serverTimestamp(),
			// };

			// await setDoc(docRef, data);
		} catch (error) {
			toastNotify?.("error", error.message);
		}
	};

	return { addUserFunc };
};

export default useAddUser;
