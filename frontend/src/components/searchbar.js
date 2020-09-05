import React, {Component} from 'react';
import _ from 'lodash';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import Fuse from 'fuse.js'
import './searchBar.css';

const initialState = {
  loading: false,
  results: [],
  value: '',
}

let previousSelection;

function SearchReducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }
    default:
      throw new Error()
  }
}

function Searchbar(props) {
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
    if (previousSelection != '') {
      console.log(previousSelection)
      props.handleSearchSelect(previousSelection, false);
      dispatch({ type: 'UPDATE_SELECTION', selection: '' });
    }

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
             props.handleSearchSelect(data.result.title, true);
             previousSelection = data.result.title;
             return dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
           }
          }
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
     
  )
}


export default Searchbar;