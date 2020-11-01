import {
  UPDATE_FREQUENCY_LIST,
  UPDATE_WORD_LIST,
  UPDATE_EMOJI_LIST,
  UPDATE_DATA_TYPE,
  UPDATE_VIZ_TYPE
} from "../constants/actionTypes";

const initialState = {
  frequencyList: [],
  emojiList: [],
  dataType: 'words',
  vizType: 'wordcloud',
};

export const rootReducer = (state = initialState, action) => {
  if (action.type === UPDATE_FREQUENCY_LIST) {
      if (state.dataType == 'words') {
        return {
          ...state,
          wordList: action.payload
        }
      } else {
        return {
          ...state,
          emojiList: action.payload
        }
      }
  }
  if (action.type === UPDATE_WORD_LIST) {
    return {
      ...state,
      wordList: action.payload
    }
  }
  if (action.type === UPDATE_EMOJI_LIST) {
    return {
      ...state,
      emojiList: action.payload
    }
  }
  if (action.type === UPDATE_DATA_TYPE) {
    return {
      ...state,
      dataType: action.payload
    }
  }
  if (action.type === UPDATE_VIZ_TYPE) {
    return {
      ...state,
      vizType: action.payload
    }
  }
  return state;
}

export default rootReducer;