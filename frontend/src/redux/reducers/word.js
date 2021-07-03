import {
  UPDATE_FREQUENCY_LIST,
  INITIALIZE_FREQUENCY_LISTS,
  UPDATE_DATA_TYPE,
  UPDATE_VIZ_TYPE,
  UPDATE_STOPWORDS,
  TOGGLE_STOPWORDS,
  HANDLE_FILTER_APPLY,
  UPDATE_WORDCLOUD_LAYOUT,
  UPDATE_STYLE
} from "../constants/actionTypes";
import { defaultWordState } from "../constants/defaultWordState";

export const word = (state = defaultWordState, action) => {
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
    const frequencyListsDict = action.payload.frequency_lists_dict
    console.log(frequencyListsDict)
    return {
      ...state,
      freuquencyLists: {
        ...state.freuquencyLists,
        words: frequencyListsDict.wordList.filter(item => !item.isStopWord),
        emojis: frequencyListsDict.emojiList,
        links: frequencyListsDict.linkList,
      },
      unfilteredFreuquencyLists: {
        ...state.unfilteredFreuquencyLists,
        words: frequencyListsDict.wordList,
        emojis: frequencyListsDict.emojiList,
        links: frequencyListsDict.linkList,
      },
      filters: {
        ...state.filters,
        words: {
            ...state.filters.words,
            startEnd: [1, frequencyListsDict.wordList.length],
            stopWordsDefault: frequencyListsDict.wordList.filter(item => item.isStopWord).map(item=>item.text),
            maxEnd: frequencyListsDict.wordList.filter(item => !item.isStopWord).length,
          },
        emojis: {
          ...state.filters.emojis,
          startEnd: [1, frequencyListsDict.emojiList.length],
          maxEnd: frequencyListsDict.emojiList.length,
        },
        links: {
          ...state.filters.links,
          startEnd: [1, frequencyListsDict.linkList.length],
          maxEnd: frequencyListsDict.linkList.length,
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
      //Update the appropraite freq list, clear the wordcloud layout, update the filters
      return {
        ...state,
        freuquencyLists: {
          ...state.freuquencyLists,
          [state.dataType]: filteredList,
        },
        wordcloudLayout: {
          ...state.wordcloudLayout,
          [state.dataType]: null,
        },
        filters: {
          ...state.filters,
          [state.dataType]: {
            ...state.filters[state.dataType],
            startEnd: action.payload.startEnd ? action.payload.startEnd : [1,1],
            polarity: action.payload.polarity ? action.payload.polarity : [-1,1],
            subjectivity: action.payload.subjectivity ? action.payload.polarity : [0,1],
          }
        }
      }
  }
  if (action.type === UPDATE_WORDCLOUD_LAYOUT) {
    return {
      ...state,
      wordcloudLayout: {
          ...state.wordcloudLayout,
          [state.dataType]: action.payload,
      }
    }
  }

  if (action.type === UPDATE_STYLE) {
    if (action.payload.type == "background") {
      return {
        ...state,
        styles: {
          ...state.styles,
          background: action.payload.value,
        }
      }
    }
    return {
      ...state,
      styles: {
        ...state.styles,
        [state.dataType]: {
          ...state.styles[state.dataType],
          [state.vizType]: {
            ...state.styles[state.dataType][state.vizType],
            [action.payload.type]: action.payload.value,
          }
        }
      }
    }
  }

  return state;
}

export default word;