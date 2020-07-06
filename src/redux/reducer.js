import { combineReducers } from "redux";

const initialUser = {
	name: "",
}

const user = (state = initialUser, action) => {
	switch (action.type) {
		case 'GET_USER':
			return action.payload;
		default:
			return state;
	}
}

const loaded = (state = false, action) => {
	switch (action.type) {
		case 'APP_LOADED':
			return true;
		default:
			return state;
	}
}

export default combineReducers({
	user,
	loaded
});