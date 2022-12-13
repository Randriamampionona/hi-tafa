import Image from "next/image";
import { GlobalContext } from "../../store/context/GlobalContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AciveStatus } from "./../common";
import useSelectChat from "../../hooks/useSelectChat";

const ProfileSlider = ({ chatList }) => {
	const { toogleSidebar } = GlobalContext();
	const { selectChatFun } = useSelectChat();

	const selectChatHandler = async (userID, email) => {
		toogleSidebar();
		await selectChatFun(userID, email);
	};

	return (
		<div className="mx-auto w-[calc(100%-1.5rem)] overflow-hidden select-none">
			<Swiper slidesPerView={5.5} spaceBetween={8}>
				{chatList?.map((profile) => (
					<SwiperSlide key={profile.userID}>
						<div
							className="flex-grow flex flex-col items-center justify-start gap-y-1 w-14"
							onClick={() =>
								selectChatHandler(profile.userID, profile.email)
							}>
							<div className="relative">
								<Image
									src={profile.img}
									alt={profile.username}
									width={52}
									height={52}
									style={{ objectFit: "cover" }}
									className="rounded-full border-2 border-greenBlue"
								/>
								<AciveStatus isActive={profile.active} />
							</div>

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

export default ProfileSlider;
