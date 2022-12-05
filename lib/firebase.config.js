import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAjU-6AaVG9d_5JtWBCprzKPkHxT2JbmHc",
	authDomain: "hi-tafa.firebaseapp.com",
	projectId: "hi-tafa",
	storageBucket: "hi-tafa.appspot.com",
	messagingSenderId: "721962466900",
	appId: "1:721962466900:web:1961d2bb7fc0861646f7c1",
};

// Initialize Firebase
const app = getApps()?.length <= 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { auth };
