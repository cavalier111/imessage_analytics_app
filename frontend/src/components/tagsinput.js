
import React from 'react';
import './tagsinput.scss';

export default function TagsInput(props) {
  const [tags, setTags] = React.useState(props.tags);
  const [newTagsCount, setNewTagsCount] = React.useState(0);

  const removeTags = indexToRemove => {
    const updatedList = [...tags.filter((_, index) => index !== indexToRemove)]
    setTags(updatedList);
    if(indexToRemove<newTagsCount){
      setNewTagsCount(newTagsCount - 1);
    }
    props.updateStopWords(updatedList);
  };

  const addTags = event => {
    if (event.target.value !== "" && props.originalFrequencyList.some(item => item.text==event.target.value )) {
      const updatedList = [event.target.value, ...tags];
      setTags(updatedList);
      setNewTagsCount(newTagsCount + 1);
      props.updateStopWords(updatedList);
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
