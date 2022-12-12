import { ProfileBar } from "../common";
import ChatList from "./ChatList";
import Footer from "./Footer";
import { AuthContext } from "../../store/context/AuthContext";
import { GlobalContext } from "../../store/context/GlobalContext";

const Sidebar = () => {
	const { isSidebarOpen } = GlobalContext();
	const { currentUser } = AuthContext();

	return (
		<aside
			className={`grid grid-rows-asideGrid bg-darkBlue text-lightWhite max-w-full w-full h-screen overflow-hidden md:max-w-[24rem] md:min-w-[24rem] ${
				isSidebarOpen
					? "min-w-[100vw] max-w-[100vw]"
					: "min-w-0 max-w-0"
			}`}>
			<ProfileBar
				username={currentUser?.displayName}
				email={currentUser?.email}
				profileImg={currentUser?.photoURL}
			/>
			<ChatList />
			<Footer />
		</aside>
	);
};

export default Sidebar;
