import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import logo from "../../public/assets/logo.png";
import { GlobalContext } from "../../store/context/GlobalContext";

const NoChat = () => {
	const { toogleSidebar } = GlobalContext();

	return (
		<div className="relative flex flex-col items-center justify-center w-full h-screen">
			<span
				className="absolute top-3 left-3 text-lg bg-darkWhite/10 p-3 mr-3 rounded-full cursor-pointer hover:bg-greenBlue/20 md:hidden"
				onClick={toogleSidebar}>
				<FaArrowLeft />
			</span>
			<Image
				src={logo}
				alt="hi-tafa"
				width={250}
				height={110}
				style={{ objectFit: "cover" }}
			/>
			<p className="text-darkWhite max-w-[70%] text-center">
				Start conversation by selecting or searching a chat
			</p>
		</div>
	);
};

export default NoChat;
