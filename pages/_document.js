import Document, { Html, Head, Main, NextScript } from "next/document";

const MyDocument = () => {
	return (
		<Html lang="en">
			<Head>
				<meta name="description" content="'Ndao hi tafa!" />
				<NextScript />
			</Head>

			<body>
				<Main />
			</body>
		</Html>
	);
};

export default MyDocument;
