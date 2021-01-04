import { defaultState } from "../constants/defaultState";

export const getFrequencyList = store =>
  store.freuquencyLists[store.dataType] ? store.freuquencyLists[store.dataType] : []

 export const getFrequencyListOriginal = store =>
  store.unfilteredFreuquencyLists[store.dataType] ? store.unfilteredFreuquencyLists[store.dataType] : []

export const getDataType = store =>
  store.dataType ? store.dataType : []

export const getVizType = store =>
  store.vizType ? store.vizType : []

export const getWordcloudLayout = store =>
  store.wordcloudLayout[store.dataType] ? store.wordcloudLayout[store.dataType] : null

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
  	return store.filters[store.dataType][type] ? store.filters[store.dataType][type] : defaultVal;
}

export const getStyle = (store,type) => {
	const defaultValues =  defaultState.styles;
	if (type == "background") {
		const defaultVal = defaultValues.background ? defaultValues.background : null;
		return store.styles.background ? store.styles.background : defaultVal;
	}
  	const defaultVal = defaultValues[store.dataType][store.vizType][type] ? defaultValues[store.dataType][store.vizType][type] : null;
  	return store.styles[store.dataType][store.vizType][type] ? store.styles[store.dataType][store.vizType][type] : defaultVal;
}