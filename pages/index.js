import ChatBox from "../components/ChatBox/ChatBox";
import { Sidebar } from "../components/Sidebar";
import nookies from "nookies";
import admin from "../lib/firebaseAdmin.config";

const HomePage = () => {
	return (
		<main className="flex w-full min-h-screen">
			<Sidebar />
			<ChatBox />
		</main>
	);
};

export default HomePage;

export const getServerSideProps = async (ctx) => {
	try {
		const cookies = nookies.get(ctx);
		const token = await admin.auth().verifyIdToken(cookies.user_token);

		if (token) {
			return {
				props: {},
			};
		}
	} catch (error) {
		ctx.res.writeHead(308, { Location: "/authorization" });
		ctx.res.end();

		return { props: {} };
	}
};
