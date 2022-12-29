import { FaImages, FaPaperPlane } from "react-icons/fa";
import useSendMessage from "./../../hooks/useSendMessage";
import { ImSpinner2 } from "react-icons/im";

const ChatInput = ({
	resetInputMessage,
	inputMessage,
	setInputMessage,
	setOpenPopup,
}) => {
	const { sendMessageFunc, isSending } = useSendMessage();

	const changeHandler = (e) => {
		setInputMessage({
			text: e.target.value,
			media: null,
		});
	};

	const sendHandler = async (e) => {
		e.preventDefault();

		(inputMessage.text?.trim() || inputMessage.media) &&
			(await sendMessageFunc(inputMessage));

		resetInputMessage();
	};

	return (
		<form
			className="flex items-center h-12 bg-lightWhite focus-within:border focus-within:border-greenBlue"
			onSubmit={sendHandler}>
			<input
				type="text"
				placeholder="Write your message..."
				className="flex-grow px-3 h-full bg-transparent border-0 outline-0"
				value={inputMessage.text}
				onChange={changeHandler}
			/>
			<div className="flex items-center h-full">
				<button
					type="button"
					className="flex items-center justify-center h-full w-12 bg-darkBlue hover:bg-darkBlue/90"
					onClick={(e) => {
						e.stopPropagation();
						setOpenPopup(true);
					}}>
					<span className="text-lightWhite text-lg">
						<FaImages />
					</span>
				</button>

				<button
					disabled={isSending}
					className="flex items-center justify-center h-full w-12 bg-greenBlue hover:bg-greenBlue/90 disabled:cursor-progress">
					{isSending ? (
						<span className="animate-spin">
							<ImSpinner2 />
						</span>
					) : (
						<span className="text-lightWhite text-lg">
							<FaPaperPlane />
						</span>
					)}
				</button>
			</div>
		</form>
	);
};

export default ChatInput;
