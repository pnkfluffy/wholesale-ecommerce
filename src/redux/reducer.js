import { combineReducers } from "redux";

const tiles = (state = [], action) => {
	switch (action.type) {
		case 'MAKE_NEW_TILE':
			state = [...state, action.payload]
			return state;
		case 'GET_ALL_TILES':
			state = action.payload
			return state;
		default:
			return state;
	}
}

const initialUser = {
	_id: "",
	googleID: "",
	name: "",
	tileIDs: [],
	positionX: 0,
	positionY: 0,
	locked: false
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
	tiles,
	user,
	loaded
});