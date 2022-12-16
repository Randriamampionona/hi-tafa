import { createContext, useContext, useReducer } from "react";
import globalReducer from "../reducer/globalReducer";
import { SET_CHAT_INFOS, TOOGLE_SIDEBAR } from "./../action/action";

const initState = {
	isSidebarOpen: true,
	selectedChatInfos: {
		chatID: null,
		receiverID: null,
	},
	toogleSidebar: (key) => {},
	setChatInfos: (chatID) => {},
};

const Context = createContext(initState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(globalReducer, initState);

	const toogleSidebar = (key) => {
		dispatch({
			type: TOOGLE_SIDEBAR,
			payload: key,
		});
	};

	const setChatInfos = (chatID) => {
		dispatch({
			type: SET_CHAT_INFOS,
			payload: chatID,
		});
	};

	const values = {
		isSidebarOpen: state.isSidebarOpen,
		selectedChatInfos: state.selectedChatInfos,
		toogleSidebar,
		setChatInfos,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const GlobalContext = () => {
	return useContext(Context);
};
