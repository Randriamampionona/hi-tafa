import toastNotify from "./../util/toast";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase.config";
import { AuthContext } from "../store/context/AuthContext";
import { useState } from "react";

const useFollow = () => {
	const { currentUser } = AuthContext();
	const [loading, setLoading] = useState(false);

	const followFunc = async (followingUserID) => {
		setLoading(true);

		try {
			if (currentUser) {
				const docRef = doc(
					db,
					"users",
					followingUserID,
					"followers",
					currentUser.uid
				);

				const isFollowed = await getDoc(docRef);

				// follow if never followed before
				if (!isFollowed.exists()) {
					const data = {
						userID: currentUser.uid,
						username: currentUser.displayName,
						email: currentUser.email,
						img: {
							profilePicture: currentUser.photoURL,
						},
					};

					await setDoc(docRef, data);
					return toastNotify("success", "Follow");
				}

				// unfollow if already followed
				await deleteDoc(docRef);
				return toastNotify("success", "Unfollow");
			}
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
			setLoading(false);
		}
	};

	return { followFunc, loading };
};

export default useFollow;
