import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../lib/firebase.config";
import toastNotify from "./../../util/toast";
import nookies from "nookies";
import {
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import {
	doc,
	getDoc,
	addDoc,
	serverTimestamp,
	collection,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { GlobalContext } from "./GlobalContext";
import useAddUser from "../../hooks/useAddUser";

const initState = {
	currentUser: null,
	authLoading: {
		signin: false,
		signup: false,
		signout: false,
		google: false,
		github: false,
	},
	signupFunc: async (email, password) => {},
	signinFunc: async (email, password) => {},
	signoutFunc: async () => {},
	signinWithProviderFunc: async (provider) => {},
};

const defaultInfos = {
	photoURL:
		"https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png",
};

const Context = createContext(initState);

export const AuthProvider = ({ children }) => {
	const { toogleSidebar, setChatInfos } = GlobalContext();
	const { addUserFunc } = useAddUser();
	const [currentUser, setCurrentUser] = useState(null);
	const [authLoading, setAuthLoading] = useState(initState.authLoading);
	const googleProvider = new GoogleAuthProvider();
	const githubProvider = new GithubAuthProvider();
	const { replace } = useRouter();

	const cookieHandler = {
		add: (token) => {
			nookies.set(null, "user_token", token, {
				path: "/",
				// maxAge: 60 * 60 * 60 * 48,
			});
		},
		delete: () => {
			nookies.destroy(null, "user_token");
		},
	};

	// listen for user state
	useEffect(
		() =>
			onAuthStateChanged(auth, (user) => {
				setCurrentUser(user);
			}),
		[]
	);

	// auth functions
	const signupFunc = async (username, email, password) => {
		setAuthLoading((prev) => ({
			...prev,
			signup: true,
		}));

		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			await updateProfile(result.user, {
				displayName: username,
				photoURL: defaultInfos.photoURL,
			});

			// add user handler
			await addUserFunc(result);

			const token = await result.user.getIdToken({ forceRefresh: true });

			cookieHandler.add(token);

			toastNotify("success", "User created successfully");
			replace("/");
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
			setAuthLoading((prev) => ({
				...prev,
				signup: false,
			}));
		}
	};

	const signinFunc = async (email, password) => {
		setAuthLoading((prev) => ({
			...prev,
			signin: true,
		}));

		try {
			const result = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			const docRef = doc(db, "users", result.user.uid);
			await updateDoc(docRef, {
				active: true,
			});

			const token = await result.user.getIdToken({ forceRefresh: true });

			cookieHandler.add(token);

			toastNotify("success", `So long ${result.user?.displayName}`);
			replace("/");
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
			setAuthLoading((prev) => ({
				...prev,
				signin: false,
			}));
		}
	};

	const signoutFunc = async () => {
		setAuthLoading((prev) => ({
			...prev,
			signout: true,
		}));

		try {
			const docRef = doc(db, "users", currentUser.uid);
			await updateDoc(docRef, {
				active: false,
			});

			await signOut(auth);

			setChatInfos({
				chatID: null,
				receiverID: null,
			});

			cookieHandler.delete();

			toastNotify("success", "See you soon");
			replace("/authorization");
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
			setAuthLoading((prev) => ({
				...prev,
				signout: false,
			}));
			toogleSidebar(false);
		}
	};

	const signinWithProviderFunc = async (provider) => {
		setAuthLoading((prev) => ({
			...prev,
			[provider]: true,
		}));

		try {
			const result = await signInWithPopup(
				auth,
				provider === "google" ? googleProvider : githubProvider
			);

			// add user handler
			await addUserFunc(result);

			const token = await result.user.getIdToken({ forceRefresh: true });

			cookieHandler.add(token);

			toastNotify("success", `So long ${result.user?.displayName}`);
			replace("/");
		} catch (error) {
			toastNotify("error", error.message);
		} finally {
			setAuthLoading((prev) => ({
				...prev,
				[provider]: false,
			}));
		}
	};

	const values = {
		currentUser,
		authLoading,
		signupFunc,
		signinFunc,
		signoutFunc,
		signinWithProviderFunc,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const AuthContext = () => {
	return useContext(Context);
};
