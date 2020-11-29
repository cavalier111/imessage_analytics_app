
import React from 'react';
import './tagsinput.scss';
import { updateStopWords } from "../redux/actions/word";
import { getFilter,getFrequencyListOriginal } from "../redux/selectors/word";
import {useDispatch, useSelector} from "react-redux";

export default function TagsInput(props) {
  const tags = useSelector((state) => getFilter(state,'stopWords'));
  const [newTagsCount, setNewTagsCount] = React.useState(0);
  const originalFrequencyList = useSelector((state) => getFrequencyListOriginal(state));
  const dispatch = useDispatch();

  const removeTags = indexToRemove => {
    const updatedList = [...tags.filter((_, index) => index !== indexToRemove)]
    dispatch(updateStopWords(updatedList, 'stopWords'));
    if(indexToRemove<newTagsCount){
      setNewTagsCount(newTagsCount - 1);
    }
  };

  const addTags = event => {
    if (event.target.value !== "" && originalFrequencyList.some(item => item.text==event.target.value ) && !tags.includes(event.target.value)) {
      const updatedList = [event.target.value, ...tags];
      dispatch(updateStopWords(updatedList));
      setNewTagsCount(newTagsCount + 1);
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
      {(newTagsCount > 0) ? <h1 className="dropDownWideElement">User Added Excluded Words:</h1> : false}
      <ul className="tagSection">
        {tags.slice(0,newTagsCount).map((tag, index) => (
          <li key={index} className="tag">
            <span className='tag-title'>{tag}</span>
            <span className='tag-close-icon'
              onClick={() => removeTags(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
      <h1 className="dropDownWideElement">Default Excluded Words:</h1>
      <ul className="tagSection">
        {tags.slice(newTagsCount).map((tag, index) => (
          <li key={index} className="tag">
            <span className='tag-title'>{tag}</span>
            <span className='tag-close-icon'
              onClick={() => removeTags(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
