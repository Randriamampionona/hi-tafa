import Head from "next/head";

const MetaHead = ({ subTitle }) => {
	return (
		<Head>
			<title>{!subTitle ? "Hi-Tafa" : `Hi-Tafa | ${subTitle}`}</title>
			<link rel="icon" href="/assets/favicon.png" />
		</Head>
	);
};

export default MetaHead;
