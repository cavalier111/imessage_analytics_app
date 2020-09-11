import React, { Component } from "react";
import { render } from "react-dom";
import Upload from './upload';
import Wordheader from './wordheader';
import Wordcloud from './wordcloud';
import Bargraph from './bargraph';
import Navbar from './navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequencyList: [],
      loaded: false,
      placeholder: "Loading",
      selectedViz: "wordcloud",
      searchedWord: "",
      previousSearchWord: "",
    };
    // this.randomlyGenerate();
  }

  switchViz = (selectedViz) => {
    if (selectedViz == 'wordcloud') {
      this.setState({selectedViz: "wordcloud"});
    } else {
      this.setState({selectedViz: "bargraph"});
    }
  }

  randomlyGenerate = () => {
        // for (var i = 0; i <100; i++) { 
        //     this.frequencyList.push({"text":Math.random().toString(36).substring(3), value: Math.floor(Math.random() * 6)});
        // }
        const randomParagraph = "Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.";
        this.setState({
          frequencyList: [...new Set(randomParagraph.split(" "))].map((word, i) => ({"text":word, value: Math.floor(Math.random() * 6)})),
        })
    }

  handleSearchSelect = (searchedWord, previousSearchWord) => {
    this.setState({searchedWord: searchedWord, previousSearchWord: previousSearchWord});
  }

  viewVizualizations = () => {
    fetch("api/texts/frequencyList")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      })
      .then(data => {
        console.log(data);
        this.setState(() => {
          return {
            frequencyList: data.frequencyList,
            loaded: true
          };
        });
      });
  }



  render() {
    let vizualization;
    if(this.state.loaded) {
      if (this.state.selectedViz == 'wordcloud') {
        vizualization = <Wordcloud frequencyList={this.state.frequencyList} searchedWord={this.state.searchedWord} previousSearchWord={this.state.previousSearchWord}/>;
      } else {
        vizualization =  <Bargraph frequencyList={this.state.frequencyList} searchedWord={this.state.searchedWord} previousSearchWord={this.state.previousSearchWord}/>;
      }
    }
    return (
      <div>
        <Navbar />
        {this.state.loaded ? false : <Upload viewVizualizations={this.viewVizualizations} />}
        {this.state.loaded ? <Wordheader switchViz={this.switchViz} frequencyList={this.state.frequencyList} handleSearchSelect={this.handleSearchSelect}/> : false}
        {vizualization}
        <span> {this.state.error} </span>
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);