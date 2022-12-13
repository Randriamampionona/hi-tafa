import ChatBox from "../components/ChatBox/ChatBox";
import { Sidebar } from "../components/Sidebar";
import { auth } from "../lib/firebase.config";

const HomePage = () => {
	return (
		<main className="flex w-full min-h-screen">
			<Sidebar />
			<ChatBox />
		</main>
	);
};

export default HomePage;

export const getServerSideProps = () => {
	// if (!auth.currentUser) {
	// 	// if (auth.currentUser) {
	// 	return {
	// 		redirect: {
	// 			destination: "/authorization",
	// 			permanent: false,
	// 		},
	// 	};
	// }

	return {
		props: {
			currentUser: auth.currentUser,
		},
	};
};
