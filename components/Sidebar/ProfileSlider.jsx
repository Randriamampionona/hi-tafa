import Image from "next/image";
import { GlobalContext } from "../../store/context/GlobalContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AciveStatus } from "./../common";
import useSelectChat from "../../hooks/useSelectChat";
import { useRouter } from "next/router";

const ProfileSlider = ({ usersList }) => {
	const { toogleSidebar } = GlobalContext();
	const { selectChatFun } = useSelectChat();
	const { push } = useRouter();

	const selectChatHandler = async (selectedUser) => {
		toogleSidebar();
		await selectChatFun(selectedUser);
		push("/");
	};

	return (
		<div className="mx-auto w-[calc(100%-1.5rem)] overflow-hidden select-none">
			<Swiper slidesPerView={5.5} spaceBetween={8}>
				{usersList?.map((user) => (
					<SwiperSlide key={user.userID}>
						<div
							className="flex-grow flex flex-col items-center justify-start gap-y-1 w-14 cursor-pointer"
							onClick={() => selectChatHandler(user)}>
							<div className="relative flex w-[52px] h-[52px]">
								<Image
									src={user.img.profilePicture}
									alt={user.username}
									width={52}
									height={52}
									style={{ objectFit: "cover" }}
									className="rounded-full border-2 border-greenBlue"
								/>
								<AciveStatus isActive={user.active} />
							</div>

							<p className="w-full text-center text-xs leading-none break-words">
								{user.username.length > 9
									? `${user.username.substring(9)}...`
									: user.username}
							</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ProfileSlider;
