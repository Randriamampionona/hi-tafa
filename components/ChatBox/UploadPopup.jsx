import Image from "next/image";
import { useRef, useState } from "react";
import { FaImages, FaTimes } from "react-icons/fa";
import useSendMessage from "../../hooks/useSendMessage";
import useUploadFile from "../../hooks/useUploadFile";
import { GlobalContext } from "../../store/context/GlobalContext";
import toastNotify from "../../util/toast";
import uuidGenerator from "../../util/uuidGenerator";

const fileSize = 3000000;

const UploadPopup = ({
	resetInputMessage,
	inputMessage,
	setInputMessage,
	setOpenPopup,
}) => {
	const {
		selectedChatInfos: { chatID },
	} = GlobalContext();
	const { isUploading, uploadFileFun, removeFileFunc, isDeleting } =
		useUploadFile();
	const { sendMessageFunc, isSending } = useSendMessage();
	const [filePath, setFilePath] = useState("");
	const inputRef = useRef(null);

	const chooseFileHandler = async (file) => {
		if (file.size > fileSize) {
			toastNotify(
				"error",
				"File too large, please choose an image less than 3MB"
			);

			return closePopupHandler();
		}

		const path = `chat/${chatID}/${uuidGenerator?.()} - ${file?.name}`;
		const downloadURL = await uploadFileFun(file, path);

		setFilePath(downloadURL?.path);

		setInputMessage((prev) => ({
			text: prev.text,
			media: downloadURL?.url,
		}));
	};

	const changeHandler = (e) => {
		setInputMessage((prev) => ({
			...prev,
			text: e.target.value,
		}));
	};

	const clearFileHandler = async () => {
		if (inputMessage.media) {
			await removeFileFunc(filePath);

			resetInputMessage();
		}
	};

	const closePopupHandler = () => {
		if (!isUploading && !isSending && !isDeleting) {
			resetInputMessage();
			setOpenPopup(false);
		}
	};

	const sendHandler = async () => {
		await sendMessageFunc(inputMessage);

		closePopupHandler();
	};

	return (
		<section
			className="z-50 absolute inset-0 grid place-items-center bg-darkBlue/70"
			onClick={closePopupHandler}>
			<div
				className="max-w-sm w-full p-3 rounded bg-darkBlue shadow"
				onClick={(e) => e.stopPropagation()}>
				<h1 className="text-lightWhite text-2xl text-center mb-4">
					Upload Picture
				</h1>

				<div className="relative grid place-items-center w-full h-48 my-2 bg-darkWhite/20 rounded border border-darkWhite/50">
					{/* file picker */}
					{inputMessage.media ? (
						<div className="w-full h-full">
							<Image
								src={inputMessage.media}
								alt={inputMessage.media}
								fill={true}
								style={{ objectFit: "contain" }}
								className="rounded"
							/>
						</div>
					) : (
						<div
							className="flex flex-col items-center w-full h-full justify-center space-y-3 cursor-pointer"
							onClick={() => inputRef?.current.click()}>
							<span className="text-3xl text-lightWhite">
								<FaImages />
							</span>
							<span className="text-xs text-darkWhite">
								choose file
							</span>
						</div>
					)}

					{/* remove image */}
					{inputMessage.media && (
						<span
							className="z-10 absolute top-2 right-2 text-lightWhite p-1 rounded-full bg-darkWhite/10 hover:bg-darkWhite/20"
							onClick={clearFileHandler}>
							<FaTimes />
						</span>
					)}

					{/* message input */}
					{inputMessage.media && (
						<input
							autoFocus
							type="text"
							placeholder="message..."
							className="z-10 absolute bottom-2 bg-lightWhite border-0 outline-0 rounded px-3 h-8 w-[80%] mx-auto focus-within:border-1 focus-within:border-greenBlue"
							value={inputMessage.text}
							onChange={changeHandler}
						/>
					)}

					{/* input */}
					<input
						type="file"
						className="hidden"
						ref={inputRef}
						onChange={(e) => chooseFileHandler(e.target.files[0])}
						accept={".png, .jpeg, .jpg, .gif, .tif"}
					/>
				</div>

				<div className="flex items-center justify-end space-x-2 w-full">
					<button
						disabled={isSending || isUploading || isDeleting}
						className="rounded text-lightWhite px-3 h-8 hover:bg-darkWhite/20 disabled:bg-darkWhite/20 disabled:cursor-progress"
						onClick={closePopupHandler}>
						<span>Cancel</span>
					</button>

					<button
						disabled={isSending || isUploading || isDeleting}
						className="rounded text-lightWhite px-3 h-8 bg-greenBlue hover:bg-greenBlue/90 disabled:bg-greenBlue/90 disabled:cursor-progress"
						onClick={sendHandler}>
						<span>{isSending ? "Sending..." : "Send"}</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default UploadPopup;
