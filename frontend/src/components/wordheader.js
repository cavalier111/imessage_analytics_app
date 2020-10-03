import React, {Component} from 'react';
import './wordheader.css';
import Button from 'react-bootstrap/Button';
import Searchbar from './searchbar';
import FilterSection from './filtersection';

class Wordheader extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedViz: "wordcloud",
        selectedDataType: 'words',
      };
    }

    handleVizChange = changeEvent => {
      this.setState({
        selectedViz: changeEvent.target.value
      });
      this.props.switchViz(changeEvent.target.value);
    }

    handleDataTypeChange = changeEvent => {
      this.setState({
        selectedDataType: changeEvent.target.value,
      });
      this.props.switchDataType(changeEvent.target.value);
    }

    render() {
        return (
          <div id="header">
            <h1 className="headerText">Total Unique Words: {this.props.frequencyList.length}<span id="totalWords"> </span> </h1>
            <div id="buttons" className="buttonSection">
              <Button variant="outline-primary" size="sm" id="reset" style={{textAlign: "center"}}>Reset Zoom</Button>
              {this.state.selectedViz == 'bargraph' ? <Button variant="outline-primary" size="sm" id="topTen" style={{textAlign: "center", display: "none"}}>Zoom to top 10</Button> : false}
              <Searchbar frequencyList={this.props.frequencyList} handleSearchSelect={this.props.handleSearchSelect}/>
              <div>
                <span>Visualization type:</span>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="vizOption" id="vizRadios1" value="wordcloud" checked={this.state.selectedViz === 'wordcloud'} onChange={this.handleVizChange} />
                  <label className="form-check-label" htmlFor="vizRadios1">
                    Wordcloud
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="vizOption" id="vizRadios2" value="bargraph" checked={this.state.selectedViz === 'bargraph'} onChange={this.handleVizChange} />
                  <label className="form-check-label" htmlFor="vizRadios2">
                    Bar Graph
                  </label>
                </div>
              </div>
              <div>
                <span>Data type:</span>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="dataType" id="typeRadios1" value="words" checked={this.state.selectedDataType === 'words'} onChange={this.handleDataTypeChange} />
                  <label className="form-check-label" htmlFor="typeRadios1">
                    Words
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="dataType" id="typeRadios2" value="emojis" checked={this.state.selectedDataType === 'emojis'} onChange={this.handleDataTypeChange} />
                  <label className="form-check-label" htmlFor="typeRadios2">
                    Emojis
                  </label>
                </div>
              </div>
              <FilterSection frequencyListLength={this.props.frequencyList.length} originalFrequencyList={this.props.originalFrequencyList} handleFilterApply={this.props.handleFilterApply} filterName="Amount of words" unfilteredLength={100} /> 
            </div>
          </div> 
        );
    }
}

export default Wordheader;
