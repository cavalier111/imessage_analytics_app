import React, {Component} from 'react';
// import _ from 'lodash';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import { getVizType, getFrequencyList, getDataType } from "../redux/selectors/word";
import { connect } from "react-redux";
import Fuse from 'fuse.js'
import './searchBar.css';

const mapStateToProps = (state) => ({
  frequencyList: getFrequencyList(state),
  vizType: getVizType(state),
  dataType: getDataType(state),
});

let vizType;
let dataType;

const initialState = {
    loading: false,
    results: [],
    value: '',
    previousSelection: '',
  };

const resultRendererWord = (wordObject) =>
  <div>
    <span className="searchResultTitle"> {wordObject.title}</span> <span className="searchResultValue">{wordObject.value} </span>
  </div>

const resultRendererEmoji = (wordObject) =>
  <div>
    <span className="searchResultTitle"> {wordObject.display}</span> <span className="searchResultValue">{wordObject.value} </span>
  </div>


function SearchReducer(state, action) {
  if(action.type == 'CLEAN_QUERY') {
    return initialState;
  } else if (action.type == 'START_SEARCH') {
    setGlow(state.previousSelection, true);
    return { ...state, loading: true, value: action.query };
  } else if (action.type =='FINISH_SEARCH') {
    return { ...state, loading: false, results: action.results };
  } else if (action.type == 'UPDATE_SELECTION') {
    setGlow(state.previousSelection, true);
    setGlow(action.value, false);
    return { ...state, value:action.value, previousSelection: action.value };
  } else {
    throw new Error();
  }
}

function setGlow(selection, remove) {
  if (selection != '') {
      const searchIdPartOne = vizType == 'wordcloud' ? 'cloud' : 'bar';
      const searchIdPartTwo = dataType == 'emojis' ? selection.display : selection.title;
      const searchedId = searchIdPartOne + searchIdPartTwo;
      const glowClass = 'glow' + searchIdPartOne;
      const desiredElement = document.getElementById(searchedId);
      console.log(searchedId,desiredElement);
      if (desiredElement != null) {
        if (remove) {
          desiredElement.classList.remove(glowClass);
        } else {
          desiredElement.classList.add(glowClass);
        }
      }
  }
}

function Searchbar(props) {
   const options = {
      includeScore: false,
      keys: ['title']
  };
  const [fuse, setFuse] = React.useState();
  React.useEffect(() => {
      let formatedFrequencyList;
      if(props.dataType == 'emojis') {
        formatedFrequencyList = props.frequencyList.map(wordObject => ({title: wordObject.searchTerm, display: wordObject.text, value: wordObject.value}));
      } else {
        formatedFrequencyList = props.frequencyList.map(wordObject => ({title: wordObject.text, display: wordObject.text, value: wordObject.value}));
      }
      const fusey = new Fuse(formatedFrequencyList, options)
      setFuse(fusey);
  }, [props.dataType]);
  vizType = props.vizType;
  dataType = props.dataType;
  const resultRenderer = props.dataType == 'emojis' ? resultRendererEmoji : resultRendererWord;
  const [state, dispatch] = React.useReducer(SearchReducer, initialState)
  const { loading, results, value, selection } = state
  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data, fuse) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })
    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      // // exact match option
      // const re = new RegExp(_.escapeRegExp(data.value), 'i')
      // const isMatch = (result) => re.test(result.title)


      // dispatch({
      //   type: 'FINISH_SEARCH',
      //   results: _.filter(formatedFrequencyList, isMatch),
      // })
      // mapValues(fuse.search(data.value), result => result.item),
      console.log(fuse.search(data.value));
      dispatch({
        type: 'FINISH_SEARCH',
        results: fuse.search(data.value).map(result => result.item),
      })
    }, 300)
  }, [])
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    
        <Search
          loading={loading}
          onResultSelect={(e, data) => {
            return dispatch({ type: 'UPDATE_SELECTION', value: data.result })
           }
          }
          resultRenderer={resultRenderer}
          onSearchChange={(e, data) => handleSearchChange(e,data,fuse)}
          results={results}
          value={value.display}
        />
     
  )
}

export default connect(mapStateToProps)(Searchbar);
