import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { getVizType } from "../redux/selectors/word";
import { initalizeFrequencyLists } from "../redux/actions/word";
import Upload from './upload';
import Wordheader from './wordheader';
import Wordcloud from './wordcloud';
import Bargraph from './bargraph';
import './loader.scss';
import store from "../redux/store/store";
import { Switch, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import axiosInstance from '../axiosApi'

const mapDispatchToProps = (dispatch) => {
  return {
    initalizeFrequencyLists: frequencyLists => dispatch(initalizeFrequencyLists(frequencyLists)),
  };
}

class Home extends Component {
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
        //     this.frequencyList.push({"text":Math.random().toString(36).substring(3), frequency: Math.floor(Math.random() * 6)});
        // }
        const randomParagraph = "Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing. ";
        return [...new Set(randomParagraph.split(" "))].map((word, i) => ({"text":word, frequency: Math.floor(Math.random() * 6)}))
    }

  viewVizualizations = () => {
    this.setState({loading: true});
    axiosInstance.get("texts/frequencyList")
      .then(response => response.data)
      .catch(error => {
        this.setState({
          error: error.message
        });
      })
      .then(data => {
        this.props.initalizeFrequencyLists(data);
        this.setState({loaded: true, loading: false});
      });
  }

  mockData = () => {
    const fList = [{"text":"i","frequency":6507,"isStopWord":false,"polarity":0.0,"subjectivity":0.0},{"text":"to","frequency":3376,"isStopWord":false,"polarity":0.0,"subjectivity":0.0},{"text":"you","frequency":3234,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"and","frequency":2866,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"the","frequency":2250,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"a","frequency":2000,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"im","frequency":1958,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"my","frequency":1765,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"it","frequency":1606,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"just","frequency":1430,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"so","frequency":1412,"isStopWord":true,"polarity":0.0,"subjectivity":0.0},{"text":"but","frequency":1406,"isStopWord":true,"polarity":0.0,"subjectivity":0.0}];
    const eList = [{"text":"❤","frequency":212,"name":"red heart","searchTerm":"red heart","polarity":0.6369,"subjectivity":0.0},{"text":"😍","frequency":127,"name":"smiling face with heart-eyes","aliases":["heart eyes"],"tags":["love","crush"],"category":"Smileys & Emotion","searchTerm":"smiling face with heart-eyes heart eyes love crush","polarity":0.8957,"subjectivity":0.6},{"text":"😘","frequency":91,"name":"face blowing a kiss","aliases":["kissing heart"],"tags":["flirt"],"category":"Smileys & Emotion","searchTerm":"face blowing a kiss kissing heart flirt","polarity":0.8934,"subjectivity":0.0},{"text":"😭","frequency":75,"name":"loudly crying face","aliases":["sob"],"tags":["sad","cry","bawling"],"category":"Smileys & Emotion","searchTerm":"loudly crying face sob sad cry bawling","polarity":-0.8834,"subjectivity":0.8},{"text":"🥰","frequency":61,"name":"smiling face with 3 hearts","aliases":["smiling face with three hearts"],"tags":["love"],"category":"Smileys & Emotion","searchTerm":"smiling face with 3 hearts smiling face with three hearts love","polarity":0.9628,"subjectivity":0.6},{"text":"😂","frequency":53,"name":"face with tears of joy","aliases":["joy"],"tags":["tears"],"category":"Smileys & Emotion","searchTerm":"face with tears of joy joy tears","polarity":0.7003,"subjectivity":0.2},{"text":"💕","frequency":32,"name":"two hearts","aliases":["two hearts"],"tags":[],"category":"Smileys & Emotion","searchTerm":"two hearts two hearts","polarity":0.8625,"subjectivity":0.0},{"text":"🤩","frequency":21,"name":"star-struck","aliases":["star struck"],"tags":["eyes"],"category":"Smileys & Emotion","searchTerm":"star-struck star struck eyes","polarity":-0.25,"subjectivity":0.0}];
    const lList = [{"text":"twitter.com","frequency":65},{"text":"www.reddit.com","frequency":35},{"text":"m.youtube.com","frequency":7},{"text":"www.youtube.com","frequency":6},{"text":"vm.tiktok.com","frequency":6},{"text":"www.facebook.com","frequency":5},{"text":"www.amazon.com","frequency":3},{"text":"www.google.com","frequency":2},{"text":"www.wsj.com","frequency":2},{"text":"www.stubhub.com","frequency":2},{"text":"open.spotify.com","frequency":2},{"text":"apple.news","frequency":2},{"text":"www.bedbathandbeyond.com","frequency":2},{"text":"www.saksoff5th.com","frequency":1},{"text":"www.target.com","frequency":1},{"text":"people.com","frequency":1},{"text":"majorevents.virginia.edu","frequency":1},{"text":"foodforall.com","frequency":1},{"text":"www.sndcrabhouse.com","frequency":1},{"text":"www.supperroom.com","frequency":1},{"text":"www.avligreek.com","frequency":1},{"text":"www.tavernakyclades.com","frequency":1},{"text":"space194.com","frequency":1},{"text":"www.nakedapartments.com","frequency":1},{"text":"www.indeed.com","frequency":1},{"text":"www.cavalierdaily.com","frequency":1},{"text":"www.setlist.fm","frequency":1},{"text":"www.theslothinstitutecostarica.org","frequency":1},{"text":"www.people-press.org","frequency":1},{"text":"m.tiktok.com","frequency":1},{"text":"thesmithrestaurant.com","frequency":1},{"text":"www.ifyourereadingthis.org","frequency":1},{"text":"www.nytimes.com","frequency":1},{"text":"www.washingtonpost.com","frequency":1},{"text":"www.sciencenews.org","frequency":1},{"text":"www.eventbrite.com","frequency":1},{"text":"www.trulia.com","frequency":1},{"text":"www.buzzfeed.com","frequency":1},{"text":"news.virginia.edu","frequency":1},{"text":"www.zillow.com","frequency":1},{"text":"tickets.amtrak.com","frequency":1},{"text":"finance.yahoo.com","frequency":1}];
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
        {this.state.loading
          ? <div id="wordLoader" className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
          : false
        }
        <Switch>
            <Route exact path={"/login/"} component={Login}/>
            <Route exact path={"/register/"} component={Register}/>
            {/*<Route path={"/"} render={() => <div>Home again</div>}/>*/}
        </Switch>
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

export default connect(state => ({ vizType: getVizType(state) }), mapDispatchToProps)(Home);
