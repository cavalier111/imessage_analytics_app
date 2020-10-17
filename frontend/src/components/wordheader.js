import React, {Component} from 'react';
import './wordheader.css';
import Button from 'react-bootstrap/Button';
import Searchbar from './searchbar';
import FilterSection from './filtersection';
import { connect } from "react-redux";
import { updateDataType, updateVizType } from "../redux/actions/word";
import { getFrequencyList, getDataType, getVizType } from "../redux/selectors/word";

const mapStateToProps = (state) => ({
  frequencyList: getFrequencyList(state),
  dataType: getDataType(state),
  vizType: getVizType(state)
});
const mapDispatchToProps = (dispatch) => ({
  updateDataType: dataType => dispatch(updateDataType(dataType)),
  updateVizType: vizType => dispatch(updateVizType(vizType))
});


class Wordheader extends Component {
    constructor(props) {
      super(props);
    }

    handleVizChange = changeEvent => {
      this.props.updateVizType(changeEvent.target.value);
    }

    handleDataTypeChange = changeEvent => {
      this.props.updateDataType(changeEvent.target.value);
    }

    render() {
        return (
          <div id="header">
            <h1 className="headerText">Total Unique Words: {this.props.frequencyList.length}<span id="totalWords"> </span> </h1>
            <div id="buttons" className="buttonSection">
              <Button variant="outline-primary" size="sm" id="reset" style={{textAlign: "center"}}>Reset Zoom</Button>
              <Searchbar handleSearchSelect={this.props.handleSearchSelect}/>
              <div>
                <span>Visualization type:</span>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="vizOption" id="vizRadios1" value="wordcloud" checked={this.props.vizType === 'wordcloud'} onChange={this.handleVizChange} />
                  <label className="form-check-label" htmlFor="vizRadios1">
                    Wordcloud
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="vizOption" id="vizRadios2" value="bargraph" checked={this.props.vizType === 'bargraph'} onChange={this.handleVizChange} />
                  <label className="form-check-label" htmlFor="vizRadios2">
                    Bar Graph
                  </label>
                </div>
              </div>
              <div>
                <span>Data type:</span>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="dataType" id="typeRadios1" value="words" checked={this.props.dataType === 'words'} onChange={this.handleDataTypeChange} />
                  <label className="form-check-label" htmlFor="typeRadios1">
                    Words
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="dataType" id="typeRadios2" value="emojis" checked={this.props.dataType  === 'emojis'} onChange={this.handleDataTypeChange} />
                  <label className="form-check-label" htmlFor="typeRadios2">
                    Emojis
                  </label>
                </div>
              </div>
              <FilterSection frequencyListLength={this.props.frequencyList.length} originalFrequencyList={this.props.originalFrequencyList} filterName="Amount of words" /> 
            </div>
          </div> 
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wordheader);
