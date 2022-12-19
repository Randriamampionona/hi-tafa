import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../lib/firebase.config";
import { AuthContext } from "../store/context/AuthContext";
import uuidGenerator from "../util/uuidGenerator";
import toastNotify from "./../util/toast";
import useUploadFile from "./useUploadFile";

const initState = {
	profilePicture: false,
	coverPhoto: false,
};

const useUpdateProfile = () => {
	const { currentUser } = AuthContext();
	const { uploadFileFun } = useUploadFile();
	const [loading, setLoading] = useState(initState);

	const updateImgFun = async (imgType, file) => {
		setLoading((prev) => ({
			...prev,
			[imgType]: true,
		}));

		try {
			const path = `user/${currentUser?.uid}/${uuidGenerator?.()} - ${
				file?.name
			}`;
			const uploadRes = await uploadFileFun(file, path);

			if (currentUser && uploadRes?.url && uploadRes?.path) {
				// update profile in firestore
				const docRef = doc(db, "users", currentUser?.uid);
				const data = {
					[`img.${imgType}`]: uploadRes?.url,
				};
				await updateDoc(docRef, data);

				// update profile in auth if img type === profilePicture
				if (imgType === "profilePicture") {
					await updateProfile(currentUser, {
						photoURL: uploadRes?.url,
					});

					return toastNotify?.("success", "Profile picture updated");
				}

				return toastNotify?.("success", "Cover photo updated");
			}
		} catch (error) {
			toastNotify?.("error", error.message);
		} finally {
			setLoading((prev) => ({
				...prev,
				[imgType]: false,
			}));
		}
	};

	return { loading, updateImgFun };
};

export default useUpdateProfile;
// {
//     userID: result?.user?.uid,
//     username: result?.user?.displayName,
//     email: result?.user?.email,
//     img: {
//         profilePicture: result?.user?.photoURL,
//         coverPhoto: result?.user?.photoURL,
//     },
//     active: true,
//     isBanned: false,
//     joinedOn: serverTimestamp(),
// };
