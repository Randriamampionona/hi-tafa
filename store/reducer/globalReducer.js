import { SET_CHAT_INFOS, TOOGLE_SIDEBAR } from "../action/action";

const globalReducer = (state, action) => {
	switch (action.type) {
		case TOOGLE_SIDEBAR:
			return {
				...state,
				isSidebarOpen: action?.payload
					? action?.payload
					: !state.isSidebarOpen,
			};

		case SET_CHAT_INFOS:
			return {
				...state,
				selectedChatInfos: {
					chatID: action?.payload?.chatID,
					receiverID: action?.payload?.receiverID,
				},
			};

		default:
			return state;
	}
};

export default globalReducer;
