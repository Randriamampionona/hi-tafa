import { FaCog, FaSignOutAlt } from "react-icons/fa";

const Footer = () => {
	return (
		<div className="flex items-center justify-center gap-x-3 px-3 py-1 bg-[#21364b]">
			<button className="flex-grow flex items-center justify-center gap-x-3 rounded py-2 hover:bg-darkWhite/20">
				<span>
					<FaSignOutAlt />
				</span>
				<span>Sign Out</span>
			</button>

			<button className="flex-grow flex items-center justify-center gap-x-3 rounded py-2 hover:bg-darkWhite/20">
				<span>
					<FaCog />
				</span>
				<span>Settings</span>
			</button>
		</div>
	);
};

export default Footer;
