import Image from "next/image";
import { useRouter } from "next/router";
import {
	FaCamera,
	FaEdit,
	FaFacebook,
	FaGithub,
	FaInstagram,
	FaArrowLeft,
} from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { AuthContext } from "../../../store/context/AuthContext";
import { GlobalContext } from "../../../store/context/GlobalContext";
import AciveStatus from "../AciveStatus/AciveStatus";

const defaultInfos = {
	displayName: "unknown",
	photoURL:
		"https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png",
};

const ProfileBar = ({ profileImg, username, email, active, isChatBox }) => {
	const { toogleSidebar } = GlobalContext();
	const { currentUser } = AuthContext();
	const { push } = useRouter();

	return (
		<div
			className={`flex items-center justify-between p-3 border-b border-darkWhite/20 ${
				isChatBox ? "bg-lightWhite" : "bg-darkBlue"
			}`}>
			<div className="flex items-center gap-x-2">
				{isChatBox && (
					<span
						className="text-lg bg-darkWhite/10 p-3 mr-3 rounded-full cursor-pointer hover:bg-greenBlue/20 md:hidden"
						onClick={toogleSidebar}>
						<FaArrowLeft />
					</span>
				)}
				<div className="relative">
					<Image
						src={profileImg || defaultInfos.photoURL}
						alt={username || defaultInfos.displayName}
						width={52}
						height={52}
						style={{ objectFit: "cover" }}
						className="rounded-full border-2 border-greenBlue"
					/>
					{isChatBox && <AciveStatus isActive={active} />}
				</div>

				<div>
					<p className="font-bold text-lg leading-none">
						{username || defaultInfos.displayName}
					</p>
					<h3 className="font-normal text-sm text-darkWhite cursor-default hover:text-greenBlue">
						{email}
					</h3>
				</div>
			</div>

			{isChatBox ? (
				<div className="flex items-center gap-x-3">
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
				<div className="flex items-center gap-x-3">
					<span className="text-lg bg-darkWhite/10 p-3 rounded-full cursor-pointer hover:bg-darkWhite/20">
						<FaCamera />
					</span>
					<span
						className="text-lg bg-darkWhite/10 p-3 rounded-full cursor-pointer hover:bg-darkWhite/20"
						onClick={() => push(`/profile/${currentUser.uid}`)}>
						<FaEdit />
					</span>
				</div>
			)}
		</div>
	);
};

export default ProfileBar;
