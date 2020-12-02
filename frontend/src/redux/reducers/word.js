import {
  UPDATE_FREQUENCY_LIST,
  INITIALIZE_FREQUENCY_LISTS,
  UPDATE_DATA_TYPE,
  UPDATE_VIZ_TYPE,
  UPDATE_STOPWORDS,
  TOGGLE_STOPWORDS,
  HANDLE_FILTER_APPLY,
} from "../constants/actionTypes";

const initialState = {
  freuquencyLists: {
    words: [],
    emojis: [],
    links:[],
  },
  unfilteredFreuquencyLists: {
    words: [],
    emojis: [],
    links:[],
  },
  dataType: 'words',
  vizType: 'wordcloud',
  filters: {
    words: {
      startEnd: [1,1],
      maxEnd: 1,
      polarity: [-1,1],
      subjectivity:[0,1],
      stopWordsEnabled: true,
      stopWordsUser:[],
      stopWordsDefault:[],
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
    return {
      ...state,
      freuquencyLists: {
        ...state.freuquencyLists,
        [state.dataType]: action.payload,
      }
    }
  }
  if (action.type === INITIALIZE_FREQUENCY_LISTS) {
    return {
      ...state,
      freuquencyLists: {
        ...state.freuquencyLists,
        words: action.payload.wordList.filter(item => !item.isStopWord),
        emojis: action.payload.emojiList,
        links: action.payload.linkList,
      },
      unfilteredFreuquencyLists: {
        ...state.unfilteredFreuquencyLists,
        words: action.payload.wordList,
        emojis: action.payload.emojiList,
        links: action.payload.linkList,
      },
      filters: {
        ...state.filters,
        words: {
            ...state.filters.words,
            startEnd: [1, action.payload.wordList.length],
            stopWordsDefault: action.payload.wordList.filter(item => item.isStopWord).map(item=>item.text),
            maxEnd: action.payload.wordList.filter(item => !item.isStopWord).length,
          },
        emojis: {
          ...state.filters.emojis,
          startEnd: [1, action.payload.emojiList.length],
          maxEnd: action.payload.emojiList.length,
        },
        links: {
          ...state.filters.emojis,
          startEnd: [1, action.payload.linkList.length],
        },
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
  if (action.type === TOGGLE_STOPWORDS) {
    const currentEnable = state.filters.words.stopWordsEnabled;
    const newMaxEnd = currentEnable 
      ? state.unfilteredFreuquencyLists.words.length 
      : state.unfilteredFreuquencyLists.words.length - state.filters.words.stopWordsDefault.length - state.filters.words.stopWordsUser.length;
    return {
      ...state,
      filters: {
        ...state.filters,
        words: {
          ...state.filters.words,
          maxEnd: newMaxEnd,
          stopWordsEnabled: !currentEnable,
        }
      }
    }
  }
  if (action.type === UPDATE_STOPWORDS) {
    const frequencyListOriginal = state.unfilteredFreuquencyLists[state.dataType];
    const stopWordList = action.payload.defaultStop ? 'stopWordsDefault' : 'stopWordsUser'
    return {
      ...state,
      filters: {
        ...state.filters,
        [state.dataType]: {
          ...state.filters[state.dataType],
          maxEnd: frequencyListOriginal.length - action.payload.stopWords.length,
          [stopWordList]: action.payload.stopWords,
        }
      }
    }
  }

  if (action.type === HANDLE_FILTER_APPLY) {
      var filteredList =  state.unfilteredFreuquencyLists[state.dataType];
      if(state.filters.words.stopWordsEnabled && state.dataType=='words') {
        filteredList = filteredList.filter(item => !state.filters.words.stopWordsDefault.includes(item.text) && !state.filters.words.stopWordsUser.includes(item.text));
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
        freuquencyLists: {
          ...state.freuquencyLists,
          [state.dataType]: filteredList,
        },
        filters: {
          ...state.filters,
          [state.dataType]: {
            ...state.filters[state.dataType],
            startEnd: action.payload.startEnd,
            polarity: action.payload.polarity,
            subjectivity: action.payload.subjectivity,
          }
        }
      }
  }
  return state;
}

export default rootReducer;