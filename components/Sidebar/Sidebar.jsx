import React from "react";
import { ProfileBar } from "../common";
import ChatList from "./ChatList";
import Footer from "./Footer";
import me from "../../public/assets/me.png";

const Sidebar = () => {
	return (
		<aside className="grid grid-rows-asideGrid bg-darkBlue text-lightWhite max-w-full w-full h-screen md:max-w-sm">
			<ProfileBar
				username={"toojrtn"}
				email={"toojrtn@gmail.com"}
				profileImg={me}
			/>
			<ChatList />
			<Footer />
		</aside>
	);
};

export default Sidebar;
