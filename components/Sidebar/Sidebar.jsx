import { ProfileBar } from "../common";
import ChatList from "./ChatList";
import Footer from "./Footer";
import { AuthContext } from "../../store/context/AuthContext";
import { GlobalContext } from "../../store/context/GlobalContext";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase.config";

const Sidebar = () => {
	const { isSidebarOpen } = GlobalContext();
	const { currentUser } = AuthContext();
	const [infosProfile, setInfosProfile] = useState(null);

	useEffect(() => {
		const getInfos = () => {
			const docRef = doc(db, "users", currentUser?.uid);
			const unsub = onSnapshot(docRef, (snapshot) => {
				if (snapshot.exists()) {
					setInfosProfile(snapshot.data());
				}
			});

			return () => {
				unsub();
			};
		};

		currentUser && getInfos();
	}, [currentUser]);

	return (
		<aside
			className={`grid grid-rows-asideGrid bg-darkBlue text-lightWhite max-w-full w-full h-screen overflow-hidden md:max-w-[24rem] md:min-w-[24rem] ${
				isSidebarOpen
					? "min-w-[100vw] max-w-[100vw]"
					: "min-w-0 max-w-0"
			}`}>
			<ProfileBar
				username={infosProfile?.username || currentUser?.displayName}
				email={infosProfile?.email || currentUser?.email}
				profileImg={
					infosProfile?.img.profilePicture || currentUser?.photoURL
				}
			/>
			<ChatList />
			<Footer />
		</aside>
	);
};

export default Sidebar;
