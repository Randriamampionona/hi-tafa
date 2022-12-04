import Image from "next/image";

const ProfileSlider = ({ profileList }) => {
	return (
		<div className="grid grid-cols-profileGrid gap-x-[.4rem] items-start justify-start mx-auto w-[calc(100%-1.5rem)] overflow-hidden">
			{profileList?.map((profile) => (
				<div
					key={profile.username}
					className="flex-grow flex flex-col items-center justify-start gap-y-1">
					<Image
						src={profile.img}
						alt={profile.username}
						width={52}
						height={52}
						placeholder="blur"
						blurDataURL={profile.img}
						style={{ objectFit: "cover" }}
						className="rounded-full border-2 border-greenBlue"
					/>

					<p className="w-full text-center text-sm leading-none">
						{profile.username.length > 16
							? `${profile.username.substring(14)}...`
							: profile.username}
					</p>
				</div>
			))}
		</div>
	);
};

ProfileSlider.defaultProps = {
	profileList: [
		{
			username: "Andria Aliniaina",
			img: "/assets/profile/Andria Aliniaina.png",
		},
		{
			username: "Annick Shinary",
			img: "/assets/profile/Annick Shinary.png",
		},
		{
			username: "Bonze Athelstan",
			img: "/assets/profile/Bonze Athelstan.png",
		},
		{
			username: "Fy Hyung",
			img: "/assets/profile/Fy Hyung.png",
		},
		{
			username: "Manoa Razafi",
			img: "/assets/profile/Manoa Razafi.png",
		},
		{
			username: "Lutecianne-RM",
			img: "/assets/profile/Lutecianne-RM.png",
		},
		// {
		// 	username: "Jøsé",
		// 	img: "/assets/profile/Jøsé.png",
		// },
		// {
		// 	username: "Mac-Jacky",
		// 	img: "/assets/profile/Mac-Jacky.png",
		// },
		// {
		// 	username: "Rosah-La-Blanche",
		// 	img: "/assets/profile/Rosah-La-Blanche.png",
		// },
		// {
		// 	username: "SHIN YU",
		// 	img: "/assets/profile/SHIN YU.png",
		// },
		// {
		// 	username: "Stecy Ashley",
		// 	img: "/assets/profile/Stecy Ashley.png",
		// },
		// {
		// 	username: "Swae Todoroki",
		// 	img: "/assets/profile/Swae Todoroki.png",
		// },
		// {
		// 	username: "Tsiory Ralison",
		// 	img: "/assets/profile/Tsiory Ralison.png",
		// },
	],
};

export default ProfileSlider;
