export const getFrequencyList = store =>
  store.freuquencyLists[store.dataType] ? store.freuquencyLists[store.dataType] : []

 export const getFrequencyListOriginal = store =>
  store.unfilteredFreuquencyLists[store.dataType] ? store.unfilteredFreuquencyLists[store.dataType] : []

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
	  case 'stopWordsDefault':
	    defaultVal = []
	    break;
	  case 'stopWordsUser':
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

