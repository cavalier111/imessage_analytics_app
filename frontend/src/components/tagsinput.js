
import React from 'react';
import './tagsinput.scss';
import { updateStopWords } from "../redux/actions/word";
import { getFilter, getFrequencyListOriginal } from "../redux/selectors/word";
import {useDispatch, useSelector} from "react-redux";

export default function TagsInput(props) {
  const tagsDefault = useSelector((state) => getFilter(state,'stopWordsDefault'));
  const tagsUser = useSelector((state) => getFilter(state,'stopWordsUser'));
  const originalFrequencyList = useSelector((state) => getFrequencyListOriginal(state));
  const dispatch = useDispatch();

  const removeTags = (indexToRemove, defaultStop=true) => {
    const tags = defaultStop ? tagsDefault : tagsUser;
    const updatedList = [...tags.filter((_, index) => index !== indexToRemove)]
    dispatch(updateStopWords({ stopWords: updatedList, defaultStop: defaultStop }));
  };

  const addTags = event => {
    if (event.target.value !== "" && originalFrequencyList.some(item => item.text==event.target.value )
      && !tagsDefault.includes(event.target.value) && !tagsUser.includes(event.target.value)) {
      const updatedList = [event.target.value, ...tagsUser];
      dispatch(updateStopWords({ stopWords: updatedList, defaultStop: false }));
      event.target.value = "";
    }
  };
  
  return (
    <div className="tags-input">
      <input
        className="dropDownWideElement"
        type="text"
        onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
        placeholder="Press enter to add to excluded words"
      />
      {(tagsUser.length > 0) ? <h1 className="dropDownWideElement">User Added Excluded Words:</h1> : false}
      <ul className="tagSection">
        {tagsUser.map((tag, index) => (
          <li key={index} className="tag">
            <span className='tag-title'>{tag}</span>
            <span className='tag-close-icon'
              onClick={() => removeTags(index, false)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
      <h1 className="dropDownWideElement">Default Excluded Words:</h1>
      <ul className="tagSection">
        {tagsDefault.map((tag, index) => (
          <li key={index} className="tag">
            <span className='tag-title'>{tag}</span>
            <span className='tag-close-icon'
              onClick={() => removeTags(index, true)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
