import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { getVizType } from "../redux/selectors/word";
import { initalizeFrequencyLists } from "../redux/actions/word";
import Upload from './upload';
import Wordheader from './wordheader';
import Wordcloud from './wordcloud';
import Bargraph from './bargraph';
import NavigationBar from './navigationbar';
import './loader.scss';
import store from "../redux/store/word";

const mapDispatchToProps = (dispatch) => {
  return {
    initalizeFrequencyLists: frequencyLists => dispatch(initalizeFrequencyLists(frequencyLists)),
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      placeholder: "Loading",
      searchedWord: "",
      previousSearchWord: "",
    };
  }
  componentDidMount() {
    // this.viewVizualizations();
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
        this.props.initalizeFrequencyLists(data);
        this.setState({loaded: true, loading: false});
      });
  }

  mockData = () => {
    const fList = [{"text":"i","value":6507,"isStopWord":false,"polarity":0.0,"subjectivity":0.0},{"text":"to","value":3376,"isStopWord":false,"polarity":0.0,"subjectivity":0.0},{"text":"you","value":3234,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"and","value":2866,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"the","value":2250,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"a","value":2000,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"im","value":1958,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"my","value":1765,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"it","value":1606,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"just","value":1430,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"so","value":1412,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"but","value":1406,"isStopWord":true,"polarity":0.0,"subjectivity":0.0}];
    const eList = [{"text":"❤","value":212,"name":"red heart","searchTerm":"red heart","polarity":0.6369,"subjectivity":0.0},{"text":"😍","value":127,"name":"smiling face with heart-eyes","aliases":["heart eyes"],"tags":["love","crush"],"category":"Smileys & Emotion","searchTerm":"smiling face with heart-eyes heart eyes love crush","polarity":0.8957,"subjectivity":0.6},{"text":"😘","value":91,"name":"face blowing a kiss","aliases":["kissing heart"],"tags":["flirt"],"category":"Smileys & Emotion","searchTerm":"face blowing a kiss kissing heart flirt","polarity":0.8934,"subjectivity":0.0},{"text":"😭","value":75,"name":"loudly crying face","aliases":["sob"],"tags":["sad","cry","bawling"],"category":"Smileys & Emotion","searchTerm":"loudly crying face sob sad cry bawling","polarity":-0.8834,"subjectivity":0.8},{"text":"🥰","value":61,"name":"smiling face with 3 hearts","aliases":["smiling face with three hearts"],"tags":["love"],"category":"Smileys & Emotion","searchTerm":"smiling face with 3 hearts smiling face with three hearts love","polarity":0.9628,"subjectivity":0.6},{"text":"😂","value":53,"name":"face with tears of joy","aliases":["joy"],"tags":["tears"],"category":"Smileys & Emotion","searchTerm":"face with tears of joy joy tears","polarity":0.7003,"subjectivity":0.2},{"text":"💕","value":32,"name":"two hearts","aliases":["two hearts"],"tags":[],"category":"Smileys & Emotion","searchTerm":"two hearts two hearts","polarity":0.8625,"subjectivity":0.0},{"text":"🤩","value":21,"name":"star-struck","aliases":["star struck"],"tags":["eyes"],"category":"Smileys & Emotion","searchTerm":"star-struck star struck eyes","polarity":-0.25,"subjectivity":0.0}];
    const lList = [{"text":"twitter.com","value":65},{"text":"www.reddit.com","value":35},{"text":"m.youtube.com","value":7},{"text":"www.youtube.com","value":6},{"text":"vm.tiktok.com","value":6},{"text":"www.facebook.com","value":5},{"text":"www.amazon.com","value":3},{"text":"www.google.com","value":2},{"text":"www.wsj.com","value":2},{"text":"www.stubhub.com","value":2},{"text":"open.spotify.com","value":2},{"text":"apple.news","value":2},{"text":"www.bedbathandbeyond.com","value":2},{"text":"www.saksoff5th.com","value":1},{"text":"www.target.com","value":1},{"text":"people.com","value":1},{"text":"majorevents.virginia.edu","value":1},{"text":"foodforall.com","value":1},{"text":"www.sndcrabhouse.com","value":1},{"text":"www.supperroom.com","value":1},{"text":"www.avligreek.com","value":1},{"text":"www.tavernakyclades.com","value":1},{"text":"space194.com","value":1},{"text":"www.nakedapartments.com","value":1},{"text":"www.indeed.com","value":1},{"text":"www.cavalierdaily.com","value":1},{"text":"www.setlist.fm","value":1},{"text":"www.theslothinstitutecostarica.org","value":1},{"text":"www.people-press.org","value":1},{"text":"m.tiktok.com","value":1},{"text":"thesmithrestaurant.com","value":1},{"text":"www.ifyourereadingthis.org","value":1},{"text":"www.nytimes.com","value":1},{"text":"www.washingtonpost.com","value":1},{"text":"www.sciencenews.org","value":1},{"text":"www.eventbrite.com","value":1},{"text":"www.trulia.com","value":1},{"text":"www.buzzfeed.com","value":1},{"text":"news.virginia.edu","value":1},{"text":"www.zillow.com","value":1},{"text":"tickets.amtrak.com","value":1},{"text":"finance.yahoo.com","value":1}];
    const mockResponse = {
      wordList: fList,
      emojiList: eList,
      linkList: lList,
    };
    this.props.initalizeFrequencyLists(mockResponse);
    
  }


  render() {
    let vizualization;
    if(this.state.loaded) {
      if (this.props.vizType == 'wordcloud') {
        vizualization = <Wordcloud/>;
      } else {
        vizualization =  <Bargraph/>;
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
        {this.state.loaded ? <Wordheader/> : false}
        {vizualization}
        <span> {this.state.error} </span>
        <button type="submit" onClick={() => this.mockData()}>mock</button>
        <button type="submit" onClick={() => this.setState({loaded: true, loading: false})}>Start Mock</button>
        <button type="submit" onClick={() => this.viewVizualizations()}>Start Real</button>
      </div>
    );
  }
}

export default connect(state => ({ vizType: getVizType(state) }), mapDispatchToProps)(App);
