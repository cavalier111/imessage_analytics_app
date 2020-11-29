import {
	UPDATE_FREQUENCY_LIST,
	UPDATE_WORD_LIST,
	UPDATE_EMOJI_LIST,
	UPDATE_DATA_TYPE,
	UPDATE_VIZ_TYPE,
	UPDATE_STOPWORDS,
	HANDLE_FILTER_APPLY
} from '../constants/actionTypes';

export const updateFrequencyList = payload => ({
	type: UPDATE_FREQUENCY_LIST,
	payload
});

export const updateWordList = payload => ({
	type: UPDATE_WORD_LIST,
	payload
});

export const updateEmojiList = payload => ({
	type: UPDATE_EMOJI_LIST,
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

export const updateStopWords = payload => ({
	type: UPDATE_STOPWORDS,
	payload
});

export const handleFilterApply = payload => ({
	type: HANDLE_FILTER_APPLY,
	payload
});
