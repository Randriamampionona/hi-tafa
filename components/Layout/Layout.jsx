import { Fragment } from "react";
import { MetaHead } from "./../common";

const Layout = ({ children }) => {
	return (
		<Fragment>
			<MetaHead />
			{children}
		</Fragment>
	);
};

export default Layout;
