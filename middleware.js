import { NextResponse } from "next/server";

const baseURL =
	process.env.NODE_ENV === "production"
		? "https://hi-tafa.vercel.app/"
		: "http://localhost:3000/";

const verifyTokenHandler = async (req) => {
	try {
		const fetcher = await fetch(`${baseURL}/api/v1/auth/verifyToken`, {
			credentials: "include",
			headers: {
				user_token: req.cookies.get("user_token")?.value,
			},
		});
		const result = await fetcher.json();

		return result;
	} catch (error) {
		// back to auth page if some error occured
		return NextResponse.redirect(`${baseURL}authorization`);
	}
};

const middleware = async (req) => {
	const URL = req.nextUrl.pathname;

	const { isTokenVerified } = await verifyTokenHandler(req);

	// redirect to home if signed in
	if (URL.startsWith("/authorization") && isTokenVerified) {
		return NextResponse.redirect(baseURL);
	}

	// redirect to authorization if not signed in
	if (
		(URL.startsWith("/profile") && !isTokenVerified) ||
		(URL === "/" && !isTokenVerified)
	) {
		return NextResponse.redirect(`${baseURL}authorization`);
	}
};

export default middleware;

export const config = {
	matcher: ["/authorization", "/", "/profile/:path*"],
};
