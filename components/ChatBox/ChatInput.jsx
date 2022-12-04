import { useState } from "react";
import { FaImages, FaPaperPlane } from "react-icons/fa";
import me from "../../public/assets/me.png";

const ChatInput = ({ setMessage, setOpenPopup }) => {
	const [value, setValue] = useState("");

	const sendHandler = (e) => {
		e.preventDefault();
		setMessage((prev) => [
			...prev,
			{
				messageID: prev.at(-1)?.messageID + 1,
				messageOwner: {
					email: "toojrtn@gmail.com",
					profileImg: me,
				},
				message: value,
				date: `${new Date().getHours()}:${new Date().getMinutes()}`,
			},
		]);

		setValue("");
	};

	return (
		<form
			className="flex items-center h-12 bg-lightWhite focus-within:border focus-within:border-greenBlue"
			onSubmit={sendHandler}>
			<input
				autoFocus
				type="text"
				placeholder="Write your message..."
				className="flex-grow px-3 h-full bg-transparent border-0 outline-0"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<div className="flex items-center h-full">
				<button
					type="button"
					className="grid place-items-center h-full w-12 bg-darkBlue hover:bg-darkBlue/90"
					onClick={(e) => {
						e.stopPropagation();
						setOpenPopup(true);
					}}>
					<span className="text-lightWhite text-lg">
						<FaImages />
					</span>
				</button>

				<button className="grid place-items-center h-full w-12 bg-greenBlue hover:bg-greenBlue/90">
					<span className="text-lightWhite text-lg">
						<FaPaperPlane />
					</span>
				</button>
			</div>
		</form>
	);
};

export default ChatInput;
