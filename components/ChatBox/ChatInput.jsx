import { FaImages, FaPaperPlane } from "react-icons/fa";
import { AuthContext } from "../../store/context/AuthContext";
import useSendMessage from "./../../hooks/useSendMessage";
import { ImSpinner2 } from "react-icons/im";

const ChatInput = ({
	resetInputMessage,
	inputMessage,
	setInputMessage,
	setOpenPopup,
}) => {
	const { currentUser } = AuthContext();
	const { sendMessageFunc, isSending } = useSendMessage();

	const changeHandler = (e) => {
		setInputMessage({
			profileImg: currentUser?.photoURL,
			email: currentUser?.email,
			msg: {
				text: e.target.value,
				media: null,
			},
			date: new Date().toString(),
		});
	};

	const sendHandler = async (e) => {
		e.preventDefault();

		await sendMessageFunc(inputMessage);

		resetInputMessage();
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
				value={inputMessage.msg.text}
				onChange={changeHandler}
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

				<button
					disabled={isSending}
					className="grid place-items-center h-full w-12 bg-greenBlue hover:bg-greenBlue/90 disabled:cursor-progress">
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
