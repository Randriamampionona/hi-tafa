import ChatBox from "../components/ChatBox/ChatBox";
import { Sidebar } from "../components/Sidebar";

const HomePage = () => {
	return (
		<main className="flex w-full min-h-screen">
			<Sidebar />
			<ChatBox />
		</main>
	);
};

export default HomePage;
