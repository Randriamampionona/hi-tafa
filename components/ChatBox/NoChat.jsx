import Image from "next/image";
import logo from "../../public/assets/logo.png";

const NoChat = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full h-screen">
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
