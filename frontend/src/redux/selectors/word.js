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

export const getColorFilter = (store,type) => {
	const defaultValues = {
		colorCodedBy: {
	        wordcloud: 'none',
	        bargraph: 'none',
	    },
		color: {
			wordcloud: 'multi',
			bargraph: 'blue',
		}
	};
  	const defaultVal = defaultValues[type][store.vizType] ? defaultValues[type][store.vizType] : null;
  	return store.colorFilters[store.dataType][type][store.vizType] ? store.colorFilters[store.dataType][type][store.vizType] : defaultVal;
}