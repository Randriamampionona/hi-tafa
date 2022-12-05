import React from "react";
import { ProfileBar } from "../common";
import ChatList from "./ChatList";
import Footer from "./Footer";
import me from "../../public/assets/me.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase.config";

const defaultInfos = {
	displayName: "unknown",
	photoURL:
		"https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png",
};

const Sidebar = () => {
	const [currentUser, loading, error] = useAuthState(auth);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;

	return (
		<aside className="grid grid-rows-asideGrid bg-darkBlue text-lightWhite max-w-full w-full h-screen md:max-w-sm">
			<ProfileBar
				username={currentUser?.displayName || defaultInfos.displayName}
				email={currentUser?.email}
				profileImg={currentUser?.photoURL || defaultInfos.photoURL}
			/>
			<ChatList />
			<Footer />
		</aside>
	);
};

export default Sidebar;
