import { NextResponse } from "next/server";

const baseURL =
	process.env.NODE_ENV === "production"
		? "https://hi-tafa.vercel.app/"
		: "http://localhost:3000/";

const authPages = [baseURL, `${baseURL}profile`];

const noAuthPages = [`${baseURL}authorization`];

const middleware = async (req) => {
	const user_token = req.cookies.get(
		process.env.NEXT_PUBLIC_TOKEN_NAME
	)?.value;
	const URL = req.url;

	try {
		// skip if url doesn't require auth/no-auth
		if (
			!authPages.includes(URL) &&
			!noAuthPages.includes(URL) &&
			!URL.includes(`${baseURL}profile/`)
		)
			return;

		const result = await fetch(`${baseURL}api/v1/auth/verifyToken`, {
			headers: { user_token },
		}).then((res) => res.json());

		console.log("middleware run");

		if (noAuthPages.includes(URL) && result.success) {
			return NextResponse.redirect(baseURL);
		}

		if (authPages.includes(URL) && result.error) {
			return NextResponse.redirect(`${baseURL}authorization`);
		}

		// for specifique route
		if (URL.includes(`${baseURL}profile/`) && result.error) {
			return NextResponse.redirect(`${baseURL}authorization`);
		}
	} catch (error) {
		return NextResponse.redirect(`${baseURL}authorization`);
	}
};

export default middleware;
