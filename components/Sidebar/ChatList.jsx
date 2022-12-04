import React from "react";
import Chat from "./Chat";
import ProfileSlider from "./ProfileSlider";
import Search from "./Search";

const ChatList = ({ list }) => {
	return (
		<div
			id="sidebar__chat-list"
			className="space-y-3"
			style={{ overflowY: "overlay" }}>
			<Search />
			<ProfileSlider />

			<div>
				{[...list]
					?.sort(() => Math.random() - 0.5)
					.map((chat) => (
						<Chat key={chat.username} chat={chat} />
					))}
			</div>
		</div>
	);
};

ChatList.defaultProps = {
	list: [
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

export default ChatList;
