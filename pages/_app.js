import "../styles/globals.css";
import { Layout } from "./../components/Layout";
import { AuthProvider } from "../store/context/AuthContext";
import { GlobalProvider } from "../store/context/GlobalContext";

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
