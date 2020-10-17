import { UPDATE_FREQUENCY_LIST } from '../constants/actionTypes';
import { UPDATE_WORD_LIST } from '../constants/actionTypes';
import { UPDATE_EMOJI_LIST } from '../constants/actionTypes';
import { UPDATE_DATA_TYPE } from '../constants/actionTypes';
import { UPDATE_VIZ_TYPE } from '../constants/actionTypes'

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