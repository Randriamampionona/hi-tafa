import Image from "next/image";
import {
	FaCamera,
	FaEdit,
	FaFacebook,
	FaGithub,
	FaInstagram,
} from "react-icons/fa";

const ProfileBar = ({ profileImg, username, email, isChatBox }) => {
	return (
		<div
			className={`flex items-center justify-between p-3 border-b border-darkWhite/20 ${
				isChatBox ? "bg-lightWhite" : "bg-darkBlue"
			}`}>
			<div className="flex items-center gap-x-2">
				<Image
					src={profileImg}
					alt={username}
					width={52}
					height={52}
					// placeholder="blur"
					// blurDataURL={profileImg}
					style={{ objectFit: "cover" }}
					className="rounded-full border-2 border-greenBlue"
				/>

				<div>
					<p className="font-bold text-lg leading-none">{username}</p>
					<h3 className="font-normal text-sm text-darkWhite cursor-default hover:text-greenBlue">
						{email}
					</h3>
				</div>
			</div>

			{isChatBox ? (
				<div className="flex items-center gap-x-3">
					<span className="text-lg bg-darkWhite/10 p-3 rounded-full cursor-pointer hover:bg-greenBlue/20">
						<FaFacebook />
					</span>
					<span className="text-lg bg-darkWhite/10 p-3 rounded-full cursor-pointer hover:bg-greenBlue/20">
						<FaInstagram />
					</span>
					<span className="text-lg bg-darkWhite/10 p-3 rounded-full cursor-pointer hover:bg-greenBlue/20">
						<FaGithub />
					</span>
				</div>
			) : (
				<div className="flex items-center gap-x-3">
					<span className="text-lg bg-darkWhite/10 p-3 rounded-full cursor-pointer hover:bg-darkWhite/20">
						<FaCamera />
					</span>
					<span className="text-lg bg-darkWhite/10 p-3 rounded-full cursor-pointer hover:bg-darkWhite/20">
						<FaEdit />
					</span>
				</div>
			)}
		</div>
	);
};

export default ProfileBar;
