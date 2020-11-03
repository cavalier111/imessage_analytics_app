export const getFrequencyList = store =>
  store.dataType && store.dataType == "emojis" ? getEmojiList(store) : getWordList(store);

export const getWordList = store =>
  store.wordList ? store.wordList : []

export const getEmojiList = store =>
  store.emojiList ? store.emojiList : []

export const getDataType = store =>
  store.dataType ? store.dataType : 'words'

export const getVizType = store =>
  store.vizType ? store.vizType : 'wordcloud'

export const getWordcloudObject = store =>
  store.dataType && store.dataType == "emojis" ? getEmojiCloud(store) : getWordCloud(store);

export const getWordCloud = store =>
  store.cloudObject.word ? store.cloudObject.word : 'blah'

export const getEmojiCloud = store =>
  store.cloudObject.emoji ? store.cloudObject.emoji : null
