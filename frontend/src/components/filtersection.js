import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import RangeSlider from './rangeslider';

class FilterSection extends Component {
    constructor(props) {
      super(props);
      this.state= {
        amount: [0,this.props.frequencyListLength],
        polarity: [-1,1],
        subjectivity: [0,1],
      }
    }

    handleFilterChange = (type, newValues) => {
      this.setState({
        [type]: newValues,
      });
    }

    handleFilterApply = () => {
      var filteredList = this.props.originalFrequencyList.slice(this.state.amount[0],this.state.amount[1]+1).filter(item => {
          return (item.polarity >= this.state.polarity[0]) && (item.polarity <= this.state.polarity[1]) && (item.subjectivity >= this.state.subjectivity[0]) && (item.subjectivity <= this.state.subjectivity[1]);
      })
      this.props.handleFilterApply(filteredList);
    }

    render() {
        return (
          <div>
          <DropdownButton id="dropdown-basic-button" title="Filters">
            <RangeSlider handleFilterChange={(newValues) => this.handleFilterChange('amount', newValues)} filterName="Amount of words" range={[1,this.props.originalFrequencyList.length]} currentRange={this.state.amount} step={1} />
            <RangeSlider handleFilterChange={(newValues) => this.handleFilterChange('polarity', newValues)} filterName="Polarity" range={[-1,1]} currentRange={this.state.polarity} step={.1}/>
            <RangeSlider handleFilterChange={(newValues) => this.handleFilterChange('subjectivity', newValues)} filterName="Subjectivity" range={[0,1]} currentRange={this.state.subjectivity} step={.1}/>
            <Button onClick={this.handleFilterApply} variant="outline-primary" size="sm" id="reset" style={{textAlign: "center", margin: "10px"}}>Apply filters</Button>
          </DropdownButton>
          </div> 
        );
    }
}

export default FilterSection;