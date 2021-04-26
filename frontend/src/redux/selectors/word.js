import { defaultWordState } from "../constants/defaultWordState";

export const getFrequencyList = store =>
  store.word.freuquencyLists[store.word.dataType] ? store.word.freuquencyLists[store.word.dataType] : []

 export const getFrequencyListOriginal = store =>
  store.word.unfilteredFreuquencyLists[store.word.dataType] ? store.word.unfilteredFreuquencyLists[store.word.dataType] : []

export const getDataType = store =>
  store.word.dataType ? store.word.dataType : []

export const getVizType = store =>
  store.word.vizType ? store.word.vizType : []

export const getWordcloudLayout = store =>
  store.word.wordcloudLayout[store.word.dataType] ? store.word.wordcloudLayout[store.word.dataType] : null

export const getFilter = (store,type) => {
	const defaultValues = {
		startEnd: [1,1],
		polarity: [-1,1],
		subjectivity: [0,1],
		stopWordsDefault: [],
		stopWordsUser: [],
		stopWordsEnabled: true,
	}
  	const defaultVal = defaultValues[type] ? defaultValues[type] : null;
  	return store.word.filters[store.word.dataType][type] ? store.word.filters[store.word.dataType][type] : defaultVal;
}

export const getStyle = (store,type) => {
	const defaultValues =  defaultWordState.styles;
	if (type == "background") {
		const defaultVal = defaultValues.background ? defaultValues.background : null;
		return store.word.styles.background ? store.word.styles.background : defaultVal;
	}
  	const defaultVal = defaultValues[store.word.dataType][store.word.vizType][type] ? defaultValues[store.word.dataType][store.word.vizType][type] : null;
  	return store.word.styles[store.word.dataType][store.word.vizType][type] ? store.word.styles[store.word.dataType][store.word.vizType][type] : defaultVal;
}