import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import {
	FaCamera,
	FaEdit,
	FaFacebook,
	FaGithub,
	FaInstagram,
	FaArrowLeft,
} from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import useUpdateProfile from "../../../hooks/useUpdateProfile";
import { AuthContext } from "../../../store/context/AuthContext";
import { GlobalContext } from "../../../store/context/GlobalContext";
import AciveStatus from "../AciveStatus/AciveStatus";
import LoadingImg from "../Loading/LoadingImg";

const defaultInfos = {
	displayName: "unknown",
	photoURL:
		"https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png",
};

const ProfileBar = ({ profileImg, username, email, active, isChatBox }) => {
	const {
		toogleSidebar,
		selectedChatInfos: { receiverID },
	} = GlobalContext();
	const { currentUser } = AuthContext();
	const { updateImgFun } = useUpdateProfile();
	const { push } = useRouter();
	const inpRef = useRef(null);

	const pickFileHandler = async (imgType, file) => {
		await updateImgFun(imgType, file);
	};

	const pushHandler = () => {
		isChatBox
			? push(`/profile/${receiverID}`)
			: push(`/profile/${currentUser?.uid}`);
	};

	return (
		<div
			className={`flex items-center justify-between p-3 border-b border-darkWhite/20 ${
				isChatBox ? "bg-lightWhite" : "bg-darkBlue"
			}`}>
			<div className="flex items-center space-x-2">
				{isChatBox && (
					// back btn
					<span
						className="text-lg bg-darkWhite/10 p-3 mr-3 rounded-full cursor-pointer hover:bg-greenBlue/20 lg:hidden"
						onClick={toogleSidebar}>
						<FaArrowLeft />
					</span>
				)}
				{/* img */}
				<div
					className="relative flex w-[52px] h-[52px]"
					onClick={pushHandler}>
					<Image
						src={profileImg || defaultInfos.photoURL}
						alt={username || defaultInfos.displayName}
						width={52}
						height={52}
						style={{ objectFit: "cover" }}
						className="rounded-full border-2 border-greenBlue bg-darkWhite/10"
					/>
					{!isChatBox && <LoadingImg imgType={"profilePicture"} />}
					{isChatBox && <AciveStatus isActive={active} onChatBox />}
				</div>

				{/* name/email */}
				<div>
					<p
						className="font-bold text-lg leading-none cursor-pointer w-[75%] truncate"
						onClick={pushHandler}>
						{username || defaultInfos.displayName}
					</p>
					<h3 className="font-normal text-sm text-darkWhite cursor-default hover:text-greenBlue w-[75%] truncate">
						{email}
					</h3>
				</div>
			</div>

			{isChatBox ? (
				<div className="flex items-center space-x-3">
					<span className="text-lg bg-darkWhite/10 p-3 rounded-full cursor-pointer hover:bg-greenBlue/20 hidden md:block">
						<FaFacebook />
					</span>
					<span className="text-lg bg-darkWhite/10 p-3 rounded-full cursor-pointer hover:bg-greenBlue/20 hidden md:block">
						<FaInstagram />
					</span>
					<span className="text-lg bg-darkWhite/10 p-3 rounded-full cursor-pointer hover:bg-greenBlue/20 hidden md:block">
						<FaGithub />
					</span>

					<span className="text-lg bg-darkWhite/10 p-3 rounded-full cursor-pointer hover:bg-greenBlue/20 md:hidden">
						<FiMoreVertical />
					</span>
				</div>
			) : (
				<div className="flex items-center space-x-3">
					<span
						className="text-lg bg-darkWhite/10 p-3 rounded-full cursor-pointer hover:bg-darkWhite/20"
						onClick={() => inpRef?.current.click()}>
						<FaCamera />
					</span>
					<span
						className="text-lg bg-darkWhite/10 p-3 rounded-full cursor-pointer hover:bg-darkWhite/20"
						onClick={pushHandler}>
						<FaEdit />
					</span>
					<input
						hidden
						type="file"
						accept=".jpg, .jpeg, .png"
						ref={inpRef}
						className="hidden"
						onChange={(e) =>
							pickFileHandler("profilePicture", e.target.files[0])
						}
					/>
				</div>
			)}
		</div>
	);
};

export default ProfileBar;
