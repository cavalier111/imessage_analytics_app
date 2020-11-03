import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/word";
import wordcloudMiddleware from '../middleware/word'

const store = createStore(rootReducer, applyMiddleware(wordcloudMiddleware));

export default store;