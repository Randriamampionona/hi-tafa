import { createContext, useContext, useReducer } from "react";
import globalReducer from "../reducer/globalReducer";
import { TOOGLE_SIDEBAR } from "./../action/action";

const initState = {
	isSidebarOpen: true,
	toogleSidebar: (key) => {},
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

	const values = {
		isSidebarOpen: state.isSidebarOpen,
		toogleSidebar,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const GlobalContext = () => {
	return useContext(Context);
};
