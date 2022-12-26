import toastNotify from "./../util/toast";
import { useState } from "react";
import axios from "axios";

const useFollow = () => {
	const [loading, setLoading] = useState(false);

	const followFunc = async (followingUserID) => {
		setLoading(true);

		try {
			const fetch = await axios.patch("/api/v1/profile/follow", {
				followingUserID,
			});
			const result = fetch.data;

			if (result.success) {
				return toastNotify("success", result.message);
			}

			throw new Error(result.message);

			// if (currentUser) {
			// 	const docRef = doc(
			// 		db,
			// 		"users",
			// 		followingUserID,
			// 		"followers",
			// 		currentUser.uid
			// 	);

			// 	const isFollowed = await getDoc(docRef);

			// 	// follow if never followed before
			// 	if (!isFollowed.exists()) {
			// 		const data = {
			// 			userID: currentUser.uid,
			// 			username: currentUser.displayName,
			// 			email: currentUser.email,
			// 			img: {
			// 				profilePicture: currentUser.photoURL,
			// 			},
			// 		};

			// 		await setDoc(docRef, data);
			// 		return toastNotify("success", "Follow");
			// 	}

			// 	// unfollow if already followed
			// 	await deleteDoc(docRef);
			// 	return toastNotify("success", "Unfollow");
			// }
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
			setLoading(false);
		}
	};

	return { followFunc, loading };
};

export default useFollow;
