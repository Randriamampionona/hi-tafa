import { TOOGLE_SIDEBAR } from "../action/action";

const globalReducer = (state, action) => {
	switch (action.type) {
		case TOOGLE_SIDEBAR:
			return {
				...state,
				isSidebarOpen: action?.payload
					? action?.payload
					: !state.isSidebarOpen,
			};

		default:
			return state;
	}
};

export default globalReducer;
