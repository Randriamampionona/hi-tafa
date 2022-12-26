import nookies from "nookies";

const cookiesHandler = () => {
	return {
		set: (ctx = null, token) => {
			nookies.set(ctx, process.env.NEXT_PUBLIC_TOKEN_NAME, token, {
				path: "/",
			});
		},
		destroy: (ctx = null) => {
			nookies.destroy(ctx, process.env.NEXT_PUBLIC_TOKEN_NAME);
		},
	};
};

export default cookiesHandler;
