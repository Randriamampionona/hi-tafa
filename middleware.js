import { NextResponse } from "next/server";

const baseURL =
	process.env.NODE_ENV === "production"
		? "https://hi-tafa.vercel.app/"
		: "http://localhost:3000/";

const middleware = async (req) => {
	const user_token = req.cookies.get(
		process.env.NEXT_PUBLIC_TOKEN_NAME
	)?.value;
	const URL = req.nextUrl.pathname;

	// api call to check if either user is loggedIn
	const result = await fetch(`${baseURL}api/v1/auth/verifyToken`, {
		headers: { user_token },
	}).then((res) => res.json());

	if (URL.startsWith("/") && !result?.isAuth) {
		return NextResponse.redirect(`${baseURL}authorization`);
	}

	if (URL.startsWith("/profile") && !result?.isAuth) {
		return NextResponse.redirect(`${baseURL}authorization`);
	}

	if (URL.startsWith("/authorization") && result?.isAuth) {
		return NextResponse.redirect(`${baseURL}`);
	}
};

export default middleware;

export const config = {
	matcher: ["/authorization", "/", "/profile/:path*"],
};
