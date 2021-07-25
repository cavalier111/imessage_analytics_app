import {
	UPDATE_FREQUENCY_LIST,
	INITIALIZE_FREQUENCY_LISTS,
	UPDATE_DATA_TYPE,
	UPDATE_VIZ_TYPE,
	UPDATE_WORDCLOUD_OPTIMIZATION_TYPE,
	TOGGLE_STOPWORDS,
	UPDATE_STOPWORDS,
	HANDLE_FILTER_APPLY,
	UPDATE_WORDCLOUD_LAYOUT,
	UPDATE_STYLE,
	GET_CHATS_META_DATA_LIST_SUCCESS
} from '../constants/actionTypes';
import { returnErrors } from './messages';
import axiosInstance from '../../axiosApi'

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

export const updateWordcloudOptimizationType = payload => ({
	type: UPDATE_WORDCLOUD_OPTIMIZATION_TYPE,
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

export const updateStyle = payload => ({
	type: UPDATE_STYLE,
	payload
});

// LOGIN USER
export const reloadChatsMetaData = () => (dispatch) => {
  axiosInstance
    .get("texts/chats/metaData")
    .then((res) => {
      dispatch({
        type: GET_CHATS_META_DATA_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
