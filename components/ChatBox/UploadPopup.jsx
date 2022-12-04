import Image from "next/image";
import { useRef, useState } from "react";
import { FaImages, FaTimes } from "react-icons/fa";
import me from "../../public/assets/me.png";

const UploadPopup = ({ setOpenPopup, setMessage }) => {
	const [file, setFile] = useState(null);
	const inputRef = useRef(null);

	const getFileHandler = (data) => {
		setFile(data?.name);
	};

	const closePopupHandler = () => {
		setFile(null);
		setOpenPopup(false);
	};

	const uploadHandler = () => {
		setMessage((prev) => [
			...prev,
			{
				messageID: prev.at(-1)?.messageID + 1,
				messageOwner: {
					email: "toojrtn@gmail.com",
					profileImg: me,
				},
				message: "Image uploaded",
				date: `${new Date().getHours()}:${new Date().getMinutes()}`,
			},
		]);

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
					{file ? (
						<div className="w-full h-full">
							<Image
								src={"/assets/" + file}
								alt={file}
								fill={true}
								style={{ objectFit: "contain" }}
								className="rounded"
							/>
						</div>
					) : (
						<div
							className="flex flex-col items-center w-full h-full justify-center gap-y-3 cursor-pointer"
							onClick={(e) => inputRef?.current.click()}>
							<span className="text-3xl text-lightWhite">
								<FaImages />
							</span>
							<span className="text-xs text-darkWhite">
								choose file
							</span>
						</div>
					)}

					{/* remove image */}
					{file && (
						<span
							className="z-10 absolute top-2 right-2 text-lightWhite p-1 rounded-full bg-darkWhite/10 hover:bg-darkWhite/20"
							onClick={(e) => setFile(null)}>
							<FaTimes />
						</span>
					)}

					{/* input */}
					<input
						type="file"
						className="hidden"
						ref={inputRef}
						onChange={(e) => getFileHandler(e.target.files[0])}
						accept={".png, .jpeg, .jpg, .gif, .tif"}
					/>
				</div>

				<div className="flex items-center justify-end gap-x-2 w-full">
					<button
						className="rounded text-lightWhite px-3 h-8 hover:bg-darkWhite/20"
						onClick={closePopupHandler}>
						<span>Cancel</span>
					</button>

					<button
						className="rounded text-lightWhite px-3 h-8 bg-greenBlue hover:bg-greenBlue/90"
						onClick={uploadHandler}>
						<span>Send</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default UploadPopup;
