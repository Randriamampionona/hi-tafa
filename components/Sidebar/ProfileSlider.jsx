import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { GlobalContext } from "../../store/context/GlobalContext";

const ProfileSlider = ({ profileList }) => {
	const { toogleSidebar } = GlobalContext();

	return (
		<div className="mx-auto w-[calc(100%-1.5rem)] overflow-hidden select-none">
			<Swiper slidesPerView={5.5} spaceBetween={8}>
				{profileList?.map((profile) => (
					<SwiperSlide key={profile.username}>
						<div
							className="flex-grow flex flex-col items-center justify-start gap-y-1 w-14"
							onClick={() => toogleSidebar()}>
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

							<p className="w-full text-center text-xs leading-none break-words">
								{profile.username.length > 9
									? `${profile.username.substring(9)}...`
									: profile.username}
							</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
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
		{
			username: "Jøsé",
			img: "/assets/profile/Jøsé.png",
		},
		{
			username: "Mac-Jacky",
			img: "/assets/profile/Mac-Jacky.png",
		},
		{
			username: "Rosah-La-Blanche",
			img: "/assets/profile/Rosah-La-Blanche.png",
		},
		{
			username: "SHIN YU",
			img: "/assets/profile/SHIN YU.png",
		},
		{
			username: "Stecy Ashley",
			img: "/assets/profile/Stecy Ashley.png",
		},
		{
			username: "Swae Todoroki",
			img: "/assets/profile/Swae Todoroki.png",
		},
		{
			username: "Tsiory Ralison",
			img: "/assets/profile/Tsiory Ralison.png",
		},
	],
};

export default ProfileSlider;
