import { NextResponse } from "next/server";
import { auth } from "./lib/firebase.config";

const Middleware = (req) => {
	// const url = req.url;
	// const baseURL = process.env.NEXT_PUBLIC_HOME_PAGE;
	// if (url === baseURL && !auth.currentUser) {
	// 	return NextResponse.redirect(`${baseURL}authorization`);
	// }
	// if (url === `${baseURL}authorization` && auth.currentUser) {
	// 	return NextResponse.redirect(baseURL);
	// }
};

export default Middleware;
