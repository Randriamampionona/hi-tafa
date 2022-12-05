import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase.config";
import { useRouter } from "next/router";

const Footer = () => {
	const [signOut, loading, error] = useSignOut(auth);
	const { replace } = useRouter();

	if (error) console.log(error);

	return (
		<div className="flex items-center justify-center gap-x-3 px-3 py-1 bg-[#21364b]">
			<button
				className="flex-grow flex items-center justify-center gap-x-3 rounded py-2 hover:bg-darkWhite/20"
				onClick={(e) =>
					signOut().then(() => replace("/authorization"))
				}>
				{loading ? (
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
