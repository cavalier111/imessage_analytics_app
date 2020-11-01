import React, {Component} from 'react';
import { connect } from 'react-redux'
import { updateFrequencyList } from "../redux/actions/word";
import { getFrequencyList } from "../redux/selectors/word";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import RangeSlider from './rangeslider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TagsInput from './tagsinput';

const mapDispatchToProps = (dispatch) => {
  return {
    updateFrequencyList: frequencyList => {
      return dispatch(updateFrequencyList(frequencyList));
    }
  };
}

class FilterSection extends Component {
    constructor(props) {
      super(props);
      var stopWords = this.props.originalFrequencyList.filter(word => word.isStopWord);
      stopWords = stopWords.map(word => word.text);
      this.state= {
        stopWords: stopWords,
        amount: [1,this.props.frequencyListLength],
        polarity: [-1,1],
        subjectivity: [0,1],
        stopWordsEnabled: true,
        amountSliderLimit: this.props.originalFrequencyList.length - stopWords.length,
      }
    }

    handleFilterChange = (type, newValues) => {
      this.setState({
        [type]: newValues,
      });
    }

    toggleStopWords = () => {
      this.setState({
        stopWordsEnabled: !this.state.stopWordsEnabled,
      })
    }

    handleFilterApply = () => {
      var filteredList = this.props.originalFrequencyList;
      if(this.state.stopWordsEnabled) {
        filteredList = filteredList.filter(item => !this.state.stopWords.includes(item.text));
      }
      filteredList = filteredList.slice(this.state.amount[0]-1,this.state.amount[1]+1).filter(item => {
        return (item.polarity >= this.state.polarity[0]) && (item.polarity <= this.state.polarity[1]) && (item.subjectivity >= this.state.subjectivity[0]) && (item.subjectivity <= this.state.subjectivity[1]);
      });
      // this.props.handleFilterApply(filteredList);
      this.props.updateFrequencyList(filteredList);
    }

    updateStopWords = (updatedStopWords) => {
      this.setState({
        stopWords: updatedStopWords,
        amountSliderLimit: this.state.amountSliderLimit - 1,
      })
    }


    render() {
        return (
          <div>
          <DropdownButton id="dropdown-basic-button" title="Filters">
            {this.props.frequencyList ? <span> {this.props.frequencyList.length} </span> : <span>No frequencyList</span>}
            <RangeSlider handleFilterChange={(newValues) => this.handleFilterChange('amount', newValues)} filterName="Amount of words" range={[1,this.state.amountSliderLimit]} currentRange={this.state.amount} step={1} />
            <RangeSlider handleFilterChange={(newValues) => this.handleFilterChange('polarity', newValues)} filterName="Polarity" range={[-1,1]} currentRange={this.state.polarity} step={.05}/>
            <RangeSlider handleFilterChange={(newValues) => this.handleFilterChange('subjectivity', newValues)} filterName="Subjectivity" range={[0,1]} currentRange={this.state.subjectivity} step={.05}/>
            <FormControlLabel
              control={<Switch checked={this.state.stopWordsEnabled} onChange={this.toggleStopWords} name="excludedwords" />}
              label="Enabled excluded words"
            />
            <TagsInput updateStopWords={this.updateStopWords}  tags={this.state.stopWords} originalFrequencyList={this.props.originalFrequencyList}/>
            <Button onClick={this.handleFilterApply} variant="outline-primary" size="sm" id="reset" style={{textAlign: "center", margin: "10px"}}>Apply filters</Button>
          </DropdownButton>
          </div> 
        );
    }
}

export default connect(state => ({ frequencyList: getFrequencyList(state) }), mapDispatchToProps)(FilterSection);
