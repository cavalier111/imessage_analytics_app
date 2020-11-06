import {
  UPDATE_WORDCLOUD_OBJECT,
  UPDATE_WORD_LIST,
  UPDATE_FREQUENCY_LIST,
  UPDATE_EMOJI_LIST,
} from '../constants/actionTypes';
import WordcloudService from "../../services/wordcloud.service";
import { getFrequencyList, getVizType } from "../selectors/word";

const wordcloudMiddleware = (store) => (next) => (action) => {
  console.log('middleware', action, getVizType(store.getState()), getFrequencyList(store.getState()));
  next(action)
  if (action.type == UPDATE_WORD_LIST || (action.type == UPDATE_FREQUENCY_LIST && getVizType(store.getState()) == 'wordcloud')) {
    console.log('middleware');
    console.log('getting freq', action.payload);
    store.dispatch({
      type: UPDATE_WORDCLOUD_OBJECT,
      payload: WordcloudService.findMaxLayout(action.payload),
    })
  } if(action.type === 'Tester') {
    console.log("TESTTTETRTTERTET", getFrequencyList(store.getState()));
    store.dispatch({
      type: UPDATE_WORDCLOUD_OBJECT,
      payload: WordcloudService.findMaxLayout(getFrequencyList(store.getState())),
    })
  } else {
    next(action)
  }
}
 
export default wordcloudMiddleware