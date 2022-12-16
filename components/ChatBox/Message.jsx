import Image from "next/image";
import { AuthContext } from "../../store/context/AuthContext";

const messageModel = {
	profileImg: "",
	email: "",
	msg: {
		text: "",
		media: "",
	},
	date: new Date().toString(),
};

const Message = ({ profileImg, email, msg, date }) => {
	const { currentUser } = AuthContext();

	return (
		<div
			className={`flex items-start gap-x-3 w-full px-2 ${
				email === currentUser?.email ? "justify-end" : "justify-start"
			}`}>
			<Image
				src={profileImg}
				alt={email}
				width={32}
				height={32}
				style={{ objectFit: "cover" }}
				className={`rounded-full border-2 ${
					email === currentUser?.email
						? "order-2 border-greenBlue"
						: "order-1 border-darkBlue"
				}`}
			/>
			<div
				className={`max-w-[55%] ${
					email === currentUser?.email
						? "self-end justify-end order-1"
						: "self-start justify-start order-2"
				}`}>
				<div
					className={`text-start text-lightWhite ${
						msg?.media ? "p-1" : "p-4"
					} ${
						email === currentUser?.email
							? "bg-greenBlue rounded-senderRadius"
							: "bg-darkBlue rounded-reciverRadius"
					}`}>
					{msg?.media ? (
						<Image
							src={msg?.media}
							alt={msg?.media}
							style={{ objectFit: "cover" }}
							className="rounded-md"
						/>
					) : (
						<p>{msg?.text}</p>
					)}
				</div>
				<span className="text-darkBlue/70 text-xs">
					<i>{date}</i>
				</span>
			</div>
		</div>
	);
};

export default Message;
