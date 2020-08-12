import React, {Component} from 'react';
import './wordheader.css';
import Button from 'react-bootstrap/Button';

class Wordheader extends Component {
    constructor(props) {
      super(props);
      this.state = {
        totalWords: "",
        selectedViz: "wordcloud",
      };
    }

    searchWords =  ()  => {
      console.log("heyyy");
    }

    handleVizChange = changeEvent => {
      this.setState({
        selectedViz: changeEvent.target.value
      });
    }

    render() {
        return (
          <div id="header">
            <h1 className="headerText">Total Unique Words: {this.state.totalWords}<span id="totalWords"> </span> </h1>
            <p  className="headerText" style={{marginBottom: 0}} id="filter"> Filter: stop words</p>
            <div id="buttons" className="buttonSection">
              <Button variant="outline-primary" size="sm" id="download" style={{textAlign: "center", marginRight: "50px"}}>Save</Button> 
              <Button variant="outline-primary" size="sm" id="reset" style={{textAlign: "center"}}>Reset Zoom</Button>
              <Button variant="outline-primary" size="sm" id="topTen" style={{textAlign: "center", display: "none"}}>Zoom to top 10</Button>
              <div>
                <span>Visualization type:</span>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="vizOption" id="exampleRadios1" value="wordcloud" checked={this.state.selectedViz === 'wordcloud'} onChange={this.handleVizChange} />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    Wordcloud
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="vizOption" id="exampleRadios2" value="bargraph" checked={this.state.selectedViz === 'bargraph'} onChange={this.handleVizChange} />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Bar Graph
                  </label>
                </div>
              </div>
            </div>
            <div className="searchSection">
              <input id="searchBar" className="form-control searchBox" type="text" placeholder="Search for a word" title="Search for a word" onKeyUp={this.searchWords()} />
              <div style={{position: "absolute"}}>
                <ul className="list-group" id="myUL">
                </ul>
              </div>
            </div> 
          </div> 
        );
    }
}

export default Wordheader;
