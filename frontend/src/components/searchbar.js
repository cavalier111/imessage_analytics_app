import React, {Component} from 'react';
// import _ from 'lodash';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import { getVizType, getFrequencyList } from "../redux/selectors/word";
import { connect } from "react-redux";
import Fuse from 'fuse.js'
import './searchBar.css';

const mapStateToProps = (state) => ({
  frequencyList: getFrequencyList(state),
  vizType: getVizType(state),
});

let vizType;

const initialState = {
    loading: false,
    results: [],
    value: '',
    previousSelection: '',
  };

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
    return { ...state, value: action.value, previousSelection: action.value };
  } else {
    throw new Error();
  }
}

function setGlow(selection, remove) {
  if (selection != '') {
      const searchIdPartOne = vizType == 'wordcloud' ? 'cloud' : 'bar';
      const searchedId = searchIdPartOne + selection;
      const glowClass = 'glow' + searchIdPartOne;
      const desiredElement = document.getElementById(searchedId);
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
  vizType = props.vizType;
  const [state, dispatch] = React.useReducer(SearchReducer, initialState)
  const { loading, results, value, selection } = state
        

  const formatedFrequencyList = props.frequencyList.map(wordObject => ({title: wordObject.text, value: wordObject.value}));
  const options = {
      includeScore: false,
      keys: ['title']
  };
  const fuse = new Fuse(formatedFrequencyList, options);
  const timeoutRef = React.useRef()
  const handleSearchChange = React.useCallback((e, data) => {
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
            return dispatch({ type: 'UPDATE_SELECTION', value: data.result.title })
           }
          }
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
     
  )
}

export default connect(mapStateToProps)(Searchbar);
