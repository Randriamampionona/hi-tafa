import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { AuthContext } from "../../store/context/AuthContext";

const Footer = () => {
	const { authLoading, signoutFunc } = AuthContext();

	const signoutHandler = async () => {
		await signoutFunc();
	};

	return (
		<div className="flex items-center justify-center gap-x-3 px-3 py-1 bg-[#21364b]">
			<button
				className="flex-grow flex items-center justify-center gap-x-3 rounded py-2 hover:bg-darkWhite/20"
				onClick={signoutHandler}>
				{authLoading.signout ? (
					<span className="animate-spin">
						<ImSpinner2 />
					</span>
				) : (
					<>
						<span>
							<FaSignOutAlt />
						</span>
						<span>Sign Out</span>
					</>
				)}
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
