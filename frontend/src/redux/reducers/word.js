import { UPDATE_FREQUENCY_LIST } from "../constants/actionTypes";

const initialState = {
  frequencyList: []
};

export const rootReducer = (state = initialState, action) => {
	console.log('hit reducer', action);
  if (action.type === UPDATE_FREQUENCY_LIST) {
  	console.log('UPDATE_FREQUENCY_LIST',
  		Object.assign({}, state, {
    	frequencyList: action.payload,
    }));
    return Object.assign({}, state, {
    	frequencyList: action.payload,
      // frequencyList: state.frequencyList.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;