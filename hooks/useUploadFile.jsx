import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { storage } from "../lib/firebase.config";
import toastNotify from "../util/toast";

const useUploadFile = () => {
	const [isUploading, setIsUploading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const uploadFileFun = async (file, path) => {
		setIsUploading(true);

		try {
			if (file) {
				const storageRef = ref(storage, path);
				await uploadBytes(storageRef, file);

				const downloadURL = await getDownloadURL(storageRef);

				toastNotify("success", "File uploaded");

				return {
					url: downloadURL,
					path,
				};
			}

			return toastNotify("error", "Invalide file");
		} catch (error) {
			return toastNotify("error", error.message);
		} finally {
			setIsUploading(false);
		}
	};

	const removeFileFunc = async (path) => {
		setIsDeleting(true);

		try {
			const storageRef = ref(storage, path);
			await deleteObject(storageRef);
			return toastNotify("success", "File deleted");
		} catch (error) {
			return toastNotify("error", error.message);
		} finally {
			setIsDeleting(false);
		}
	};

	return { isUploading, uploadFileFun, isDeleting, removeFileFunc };
};

export default useUploadFile;
