import { Fragment } from "react";
import { MetaHead } from "./../common";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
	return (
		<Fragment>
			<MetaHead />
			<Toaster position="top-center" />
			{children}
		</Fragment>
	);
};

export default Layout;
