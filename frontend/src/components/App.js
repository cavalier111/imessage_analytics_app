import React, { Component } from "react";
import { render } from "react-dom";
import Upload from './upload';
import Wordheader from './wordheader';
import Wordcloud from './wordcloud';
import Bargraph from './bargraph';
import NavigationBar from './navigationbar';
import './loader.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      placeholder: "Loading",
      selectedViz: "wordcloud",
      selectedDataType: "words",
      searchedWord: "",
      previousSearchWord: "",
    };
    this.viewVizualizations();
  }

  switchViz = (selectedViz) => {
    if (selectedViz == 'wordcloud') {
      this.setState({selectedViz: "wordcloud"});
    } else {
      this.setState({selectedViz: "bargraph"});
    }
  }

  switchDataType = (selectedDataType) => {
    this.setState({selectedDataType: selectedDataType});
  }

  randomlyGenerate = () => {
        // for (var i = 0; i <100; i++) { 
        //     this.frequencyList.push({"text":Math.random().toString(36).substring(3), value: Math.floor(Math.random() * 6)});
        // }
        const randomParagraph = "Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing. ";
       // this.setState({
        //   frequencyList: [...new Set(randomParagraph.split(" "))].map((word, i) => ({"text":word, value: Math.floor(Math.random() * 6)})),
        // })
        return [...new Set(randomParagraph.split(" "))].map((word, i) => ({"text":word, value: Math.floor(Math.random() * 6)}))
    }

  handleSearchSelect = (searchedWord, previousSearchWord) => {
    this.setState({searchedWord: searchedWord, previousSearchWord: previousSearchWord});
  }

  viewVizualizations = () => {
    this.setState({loading: true});
    fetch("api/texts/frequencyList")
      .then(response => response.json())
      .catch(error => {
        this.setState({
          error: error.message
        });
      })
      .then(data => {
        // data.frequencyList = this.randomlyGenerate();
        console.log(data);
        this.setState(() => {
          return {
            currentList: data.frequencyList,
            frequencyList: data.frequencyList,
            emojiList: data.emojiList,
            loaded: true,
            loading: false,
          };
        });
      });
  }



  render() {
    let vizualization;
    const data = this.state.selectedDataType == 'words' ? this.state.frequencyList : this.state.emojiList;
    if(this.state.loaded) {
      if (this.state.selectedViz == 'wordcloud') {
        vizualization = <Wordcloud frequencyList={data} dataType={this.state.selectedDataType} searchedWord={this.state.searchedWord} previousSearchWord={this.state.previousSearchWord}/>;
      } else {
        vizualization =  <Bargraph frequencyList={data} dataType={this.state.selectedDataType} searchedWord={this.state.searchedWord} previousSearchWord={this.state.previousSearchWord}/>;
      }
    }
    return (
      <div>
        <NavigationBar />
        {this.state.loading
          ? <div id="wordLoader" className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
          : false
        }
        {(this.state.loading || this.state.loaded) ? false : <Upload viewVizualizations={this.viewVizualizations} />}
        {this.state.loaded ? <Wordheader switchViz={this.switchViz} switchDataType={this.switchDataType} frequencyList={data} handleSearchSelect={this.handleSearchSelect}/> : false}
        {vizualization}
        <span> {this.state.error} </span>
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);