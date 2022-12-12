import { useState } from "react";
import { ProfileBar } from "../common";
import FyHyung from "../../public/assets/profile/Fy Hyung.png";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import me from "../../public/assets/me.png";
import fy from "../../public/assets/profile/Fy Hyung.png";
import picture from "../../public/assets/picture.jpg";
import UploadPopup from "./UploadPopup";
import { GlobalContext } from "../../store/context/GlobalContext";

const ChatBox = ({ mockMessage }) => {
	const { isSidebarOpen } = GlobalContext();
	const [message, setMessage] = useState(mockMessage);
	const [openPopup, setOpenPopup] = useState(false);

	return (
		<section
			className={`flex-grow flex-shrink grid grid-rows-asideGrid max-h-screen overflow-hidden text-darkBlue bg-[#e9ecee] sm:relative ${
				!isSidebarOpen ? "" : ""
			}`}>
			{openPopup && (
				<UploadPopup
					setOpenPopup={setOpenPopup}
					setMessage={setMessage}
				/>
			)}
			<ProfileBar
				email={"fyhyung@gami.com"}
				username={"Fy Hyung"}
				profileImg={FyHyung}
				isChatBox
			/>
			<MessageList mockMessage={message} />
			<ChatInput setMessage={setMessage} setOpenPopup={setOpenPopup} />
		</section>
	);
};

ChatBox.defaultProps = {
	mockMessage: [
		{
			messageID: 0,
			messageOwner: {
				email: "fyhyung@gami.com",
				profileImg: fy,
			},
			message: "Hi!",
			date: "17:00",
		},
		{
			messageID: 1,
			messageOwner: {
				email: "toojrtn@gmail.com",
				profileImg: me,
			},
			message:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam temporibus, aliquam quos officia sed illum!",
			date: "18:00",
		},
		{
			messageID: 2,
			messageOwner: {
				email: "fyhyung@gami.com",
				profileImg: fy,
			},
			message: "Lorem ipsum dolor sit amet consectetur adipisicing.",
			date: "18:05",
		},
		{
			messageID: 3,
			messageOwner: {
				email: "fyhyung@gami.com",
				profileImg: fy,
			},
			message:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, est debitis?",
			date: "18:05",
		},
		{
			messageID: 4,
			messageOwner: {
				email: "toojrtn@gmail.com",
				profileImg: me,
			},
			message: {
				picture,
			},
			date: "21:35",
		},
	],
};

export default ChatBox;
