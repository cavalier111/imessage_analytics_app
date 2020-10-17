export const getFrequencyList = store =>
  store.dataType && store.dataType == "emojis" ? getEmojiList(store) : getWordList(store);

export const getWordList = store =>
  store.wordList ? store.wordList : []

export const getEmojiList = store =>
  store.emojiList ? store.emojiList : []

export const getDataType = store =>
  store.dataType ? store.dataType : []

export const getVizType = store =>
  store.vizType ? store.vizType : []