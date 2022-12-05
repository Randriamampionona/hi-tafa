import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase.config";

const RequireNoAuth = (Page) => {
	return function HOC(props) {
		const [currentUser, loading, error] = useAuthState(auth);
		const { pathname, replace } = useRouter();

		if (loading) return <p>Loading...</p>;
		if (error) return <p>{error.message}</p>;

		if (pathname === "/authorization" && !currentUser) {
			return <Page {...props} />;
		} else {
			replace("/");
		}
	};
};

export default RequireNoAuth;
