import { useState } from "react";
import Image from "next/image";

const Message = ({ messageOwner, message, date }) => {
	const [sender] = useState("toojrtn@gmail.com");

	console.log(messageOwner.email, sender);

	return (
		<div
			className={`flex items-start gap-x-3 w-full px-2 ${
				messageOwner.email === sender ? "justify-end" : "justify-start"
			}`}>
			<Image
				src={messageOwner.profileImg}
				alt={messageOwner.email}
				width={32}
				height={32}
				style={{ objectFit: "cover" }}
				className={`rounded-full border-2 ${
					messageOwner.email === sender
						? "order-2 border-greenBlue"
						: "order-1 border-darkBlue"
				}`}
			/>
			<div
				className={`max-w-[55%] ${
					messageOwner.email === sender
						? "self-end justify-end order-1"
						: "self-start justify-start order-2"
				}`}>
				<div
					className={`text-start text-lightWhite ${
						message?.picture ? "p-1" : "p-4"
					} ${
						messageOwner.email === sender
							? "bg-greenBlue rounded-senderRadius"
							: "bg-darkBlue rounded-reciverRadius"
					}`}>
					{message?.picture ? (
						<Image
							src={message.picture}
							alt={message.picture}
							style={{ objectFit: "cover" }}
							className="rounded-md"
						/>
					) : (
						<p>{message}</p>
					)}
				</div>
				<span className="text-darkBlue/70 text-xs">
					<i>{date}PM</i>
				</span>
			</div>
		</div>
	);
};

export default Message;
