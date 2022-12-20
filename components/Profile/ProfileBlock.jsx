import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import { FaArrowLeft, FaCamera, FaRegEdit } from "react-icons/fa";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import { LoadingImg } from "../common";

const ProfileBlock = ({ userProfileInfos }) => {
	const { updateImgFun } = useUpdateProfile();
	const coverPhotoRef = useRef(null);
	const profilePictureRef = useRef(null);
	const { push } = useRouter();

	const pickFileHandler = async (imgType, file) => {
		await updateImgFun(imgType, file);
	};

	return (
		<div className="relative flex items-center justify-between w-full">
			{/* cover picture */}
			<div className="relative w-full h-[13.5rem] rounded overflow-hidden after:z-10 after:absolute after:bottom-0 after:w-full after:h-28 after:bg-gradient-to-b after:from-transparent after:to-darkBlue sm:h-[15.5rem] md:h-[18.5rem]">
				<Image
					src={userProfileInfos?.img.coverPhoto}
					alt={userProfileInfos?.username}
					layout="fill"
					objectFit="cover"
				/>
				<LoadingImg imgType={"coverPhoto"} />
				<button
					className="z-30 absolute bottom-4 right-4 flex items-center gap-x-1 p-2 rounded-md bg-lightWhite text-darkBlue hover:bg-lightWhite/90"
					onClick={() => coverPhotoRef?.current.click()}>
					<span>
						<FaCamera />
					</span>
					<span className="hidden sm:block">Edit cover photo</span>
				</button>
				<input
					hidden
					type="file"
					className="hidden"
					accept=".jpg, .jpeg, .png"
					ref={coverPhotoRef}
					onChange={(e) =>
						pickFileHandler("coverPhoto", e.target.files[0])
					}
				/>
				{/* back btn */}
				<span
					className="absolute top-4 left-4 text-lg bg-darkWhite/10 p-3 mr-3 rounded-full cursor-pointer hover:bg-greenBlue/20 md:hidden"
					onClick={() => push("/")}>
					<FaArrowLeft />
				</span>
			</div>

			{/* profile */}
			<div className="z-20 absolute left-0 bottom-[-16.5rem] flex flex-col items-center justify-center w-full px-4 md:flex-row md:items-end md:justify-between md:bottom-[-7rem]">
				{/* profile */}
				<div className="order-1 flex flex-col items-center justify-center space-y-4 space-x-0 md:flex-row md:items-end md:justify-start md:space-y-0 md:space-x-4">
					<figure className="relative w-36 h-36 rounded-full border-4 border-greenBlue">
						<Image
							src={userProfileInfos?.img.profilePicture}
							alt={userProfileInfos?.username}
							layout="fill"
							objectFit="cover"
							width={144}
							height={144}
							className="!rounded-full hover:brightness-90 bg-darkWhite/10"
						/>
						<LoadingImg imgType={"profilePicture"} />
						<button
							className="z-10 absolute bottom-[7px] right-[3px] p-2 rounded-full shadow shadow-darkBlue bg-darkBlue text-lightWhite hover:bg-darkBlue/90"
							onClick={() => profilePictureRef?.current.click()}>
							<span>
								<FaCamera />
							</span>
						</button>
						<input
							hidden
							type="file"
							accept=".jpg, .jpeg, .png"
							className="hidden"
							ref={profilePictureRef}
							onChange={(e) =>
								pickFileHandler(
									"profilePicture",
									e.target.files[0]
								)
							}
						/>
					</figure>

					<div className="flex flex-col text-center leading-none !mb-6 md:text-start">
						<h1 className="text-darkBlue text-2xl font-bold">
							{userProfileInfos?.username}
						</h1>
						<h3 className="font-normal text-base text-darkBlue/75 cursor-default hover:text-greenBlue">
							{userProfileInfos?.email}
						</h3>
					</div>
				</div>

				{/* counts */}
				<div className="order-3 flex-grow flex-shrink flex items-center justify-evenly gap-x-8 md:gap-x-0 md:order-2 md:mb-6">
					<div className="flex flex-col items-center justify-center text-center md:space-x-2 md:flex-row">
						<span className="text-darkBlue text-lg font-medium">
							0
						</span>
						<span className="text-sm text-darkBlue/50">Chats</span>
					</div>
					<div className="flex flex-col items-center justify-center text-center md:space-x-2 md:flex-row">
						<span className="text-darkBlue text-lg font-medium">
							0
						</span>
						<span className="text-sm text-darkBlue/50">
							Followers
						</span>
					</div>
					<div className="flex flex-col items-center justify-center text-center md:space-x-2 md:flex-row">
						<span className="text-darkBlue text-lg font-medium">
							0
						</span>
						<span className="text-sm text-darkBlue/50">Likes</span>
					</div>
				</div>

				{/* btns */}
				<div className="order-2 mb-3 md:order-3 md:mb-6">
					<button
						className=" flex items-center gap-x-1 px-4 py-2 rounded-md text-lightWhite shadow shadow-darkBlue bg-darkBlue hover:bg-darkBlue/90"
						onClick={() => profilePictureRef?.current.click()}>
						<span>
							<FaRegEdit />
						</span>
						<span>Edit profile</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProfileBlock;
