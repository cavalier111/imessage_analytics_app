export const getFrequencyList = store =>
  store.dataType && store.dataType == "emojis" ? getEmojiList(store) : getWordList(store);

 export const getFrequencyListOriginal = store =>
  store.dataType && store.dataType == "emojis" ? getEmojiListOriginal(store) : getWordListOriginal(store);

export const getWordList = store =>
  store.wordList ? store.wordList : []

export const getEmojiList = store =>
  store.emojiList ? store.emojiList : []

export const getWordListOriginal = store =>
  store.wordListOriginal ? store.wordListOriginal : []

export const getEmojiListOriginal = store =>
  store.emojiListOriginal ? store.emojiListOriginal : []

export const getDataType = store =>
  store.dataType ? store.dataType : []

export const getVizType = store =>
  store.vizType ? store.vizType : []

export const getFilter = (store,type) => {
  let defaultVal;
  switch(type) {
	  case 'startEnd':
	    defaultVal = [1,1]
	    break;
	  case 'polarity':
	    defaultVal = [-1,1]
	    break;
	  case 'subjectivity':
	    defaultVal = [0,1]
	    break;
	  case 'stopWords':
	    defaultVal = []
	    break;
	  case 'stopWordsEnabled':
	    defaultVal = true
	    break;
	  default:
	    defaultVal = null
  }
  return store.filters[store.dataType][type] ? store.filters[store.dataType][type] : defaultVal;
}

