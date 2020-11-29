import {
  UPDATE_FREQUENCY_LIST,
  UPDATE_WORD_LIST,
  UPDATE_EMOJI_LIST,
  UPDATE_DATA_TYPE,
  UPDATE_VIZ_TYPE,
  UPDATE_STOPWORDS,
  TOGGLE_STOP_WORDS,
  HANDLE_FILTER_APPLY,
} from "../constants/actionTypes";

const initialState = {
  wordList: [],
  wordListOriginal: [],
  emojiList: [],
  emojiListOriginal:[],
  dataType: 'words',
  vizType: 'wordcloud',
  filters: {
    words: {
      startEnd: [1,1],
      maxEnd: 1,
      polarity: [-1,1],
      subjectivity:[0,1],
      stopWordsEnabled: true,
      stopWords:[],
    },
    emojis: {
      startEnd: [1,1],
      maxEnd: 1,
      polarity: [-1,1],
      subjectivity:[0,1],
    }
  },
};

export const rootReducer = (state = initialState, action) => {
  if (action.type === UPDATE_FREQUENCY_LIST) {
      if (state.dataType == 'words') {
        return {
          ...state,
          wordList: action.payload,
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
      wordList: action.payload.filter(item => !item.isStopWord),
      wordListOriginal:  action.payload,
      filters: {
        ...state.filters,
        words: {
            ...state.filters.words,
            startEnd: [1, action.payload.length],
            stopWords: action.payload.filter(item => item.isStopWord).map(item=>item.text),
            maxEnd: action.payload.length,
          }
        }
    }
  }
  if (action.type === UPDATE_EMOJI_LIST) {
    return {
      ...state,
      emojiList: action.payload,
      emojiListOriginal: action.payload,
      filters: {
        ...state.filters,
        emojis: {
          ...state.filters.emojis,
          startEnd: [1, action.payload.length],
          maxEnd: action.payload.length,
        }
      }
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
  if (action.type === UPDATE_STOPWORDS) {
    const frequencyListOriginal = state.dataType == 'words' ? state.wordListOriginal : state.emojiListOriginal;
    return {
      ...state,
      filters: {
        ...state.filters,
        [state.dataType]: {
          ...state.filters[state.dataType],
          maxEnd: frequencyListOriginal.length - action.payload.length,
          stopWords: action.payload,
        }
      }
    }
  }

  if (action.type === HANDLE_FILTER_APPLY) {
      var filteredList = state.dataType == 'words' ? state.wordListOriginal : state.emojiListOriginal;
      if(action.payload.stopWordsEnabled && state.dataType=='words') {
        filteredList = filteredList.filter(item => !state.filters.words.stopWords.includes(item.text));
      }
      filteredList = filteredList.slice(action.payload.startEnd[0]-1, action.payload.startEnd[1]+1);
      if(state.dataType!='links') {
        filteredList = filteredList.filter(item => {
          return (item.polarity >= action.payload.polarity[0]) && (item.polarity <= action.payload.polarity[1])
              && (item.subjectivity >= action.payload.subjectivity[0]) && (item.subjectivity <= action.payload.subjectivity[1]);
        });
      }
      var dataList = state.dataType == 'words' ? 'wordList' : "emojiList";
      return {
        ...state,
        [dataList]: filteredList,
        filters: {
          ...state.filters,
          [state.dataType]: {
            ...state.filters[state.dataType],
            startEnd: action.payload.startEnd,
            polarity: action.payload.polarity,
            subjectivity: action.payload.subjectivity,
            stopWordsEnabled: action.payload.stopWordsEnabled
          }
        }
      }
  }
  return state;
}

export default rootReducer;