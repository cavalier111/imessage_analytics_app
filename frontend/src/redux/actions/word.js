import {
	UPDATE_FREQUENCY_LIST,
	INITIALIZE_FREQUENCY_LISTS,
	UPDATE_DATA_TYPE,
	UPDATE_VIZ_TYPE,
	TOGGLE_STOPWORDS,
	UPDATE_STOPWORDS,
	HANDLE_FILTER_APPLY,
	UPDATE_WORDCLOUD_LAYOUT
} from '../constants/actionTypes';

export const updateFrequencyList = payload => ({
	type: UPDATE_FREQUENCY_LIST,
	payload
});

export const initalizeFrequencyLists = payload => ({
	type: INITIALIZE_FREQUENCY_LISTS,
	payload
});

export const updateDataType = payload => ({
	type: UPDATE_DATA_TYPE,
	payload
});

export const updateVizType = payload => ({
	type: UPDATE_VIZ_TYPE,
	payload
});

export const toggleStopWords = () => ({
	type: TOGGLE_STOPWORDS
});

export const updateStopWords = payload => ({
	type: UPDATE_STOPWORDS,
	payload
});

export const handleFilterApply = payload => ({
	type: HANDLE_FILTER_APPLY,
	payload
});

export const updateWordcloudLayout = payload => ({
	type: UPDATE_WORDCLOUD_LAYOUT,
	payload
});
