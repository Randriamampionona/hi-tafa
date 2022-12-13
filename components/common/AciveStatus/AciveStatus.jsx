const AciveStatus = ({ isActive, onChatBox }) => {
	return (
		<span
			className={`absolute bottom-[-2px] right-[5px] w-[.75rem] h-[.75rem] rounded-full border-2 ${
				onChatBox ? "border-lightWhite" : "border-darkBlue"
			} ${isActive ? "bg-green-400" : "bg-red-400"}`}
		/>
	);
};

export default AciveStatus;
