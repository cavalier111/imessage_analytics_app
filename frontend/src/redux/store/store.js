import { createStore, applyMiddleware } from "redux";

import rootReducer from "../reducers/index";
import thunk from 'redux-thunk';


const initialState = {};


const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

// not sure if i need this composeWithDevTools
	// import { composeWithDevTools } from 'redux-devtools-extension';
	// composeWithDevTools(applyMiddleware(...middleware)),


export default store;