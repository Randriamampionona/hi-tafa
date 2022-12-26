import "../styles/globals.css";
import { Layout } from "./../components/Layout";
import { AuthProvider } from "../store/context/AuthContext";
import { GlobalProvider } from "../store/context/GlobalContext";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
	process.env.NODE_ENV === "production"
		? "https://hi-tafa.vercel.app"
		: "http://localhost:3000";

const MyApp = ({ Component, pageProps }) => {
	return (
		<GlobalProvider>
			<AuthProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AuthProvider>
		</GlobalProvider>
	);
};

export default MyApp;
