import Document, { Html, Head, Main, NextScript } from "next/document";

const MyDocument = () => {
	return (
		<Html lang="en">
			<Head>
				<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5906051574535378"
     crossorigin="anonymous"></script>
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
