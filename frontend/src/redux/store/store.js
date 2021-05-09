import { createStore, applyMiddleware } from "redux";

import rootReducer from "../reducers/index";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};


const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;