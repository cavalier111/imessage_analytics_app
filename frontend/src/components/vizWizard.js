import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { initalizeFrequencyLists, reloadChatsMetaData, updateChatId } from "../redux/actions/word";
import { getVizType, getChatId, getFrequencyList } from "../redux/selectors/word";
import Wordheader from './wordheader';
import Wordcloud from './wordcloud';
import Bargraph from './bargraph';
import './App.css'


const mapStateToProps = (state) => ({
  vizType: getVizType(state),
  chatId: getChatId(state),
});


const mapDispatchToProps = (dispatch) => {
  return {
    initalizeFrequencyLists: chatId => dispatch(initalizeFrequencyLists(chatId)),
    reloadChatsMetaData: chatId => dispatch(reloadChatsMetaData(chatId)),
    updateChatId: chatId => dispatch(updateChatId(chatId)),
  };
}

class VizWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loading: false,
    }
  }

  componentDidMount() {
    this.setState({loading: true});
    const localStoragChatId = localStorage.getItem('chat_id');
    if(!this.props.chatId && !localStoragChatId) {
      this.props.reloadChatsMetaData().then(()=> {
        this.props.initalizeFrequencyLists(this.props.chatId)
          .then(() => {
            this.setState({loaded: true, loading: false});
          });
      });
    } else {
      if (localStoragChatId) {
        this.props.updateChatId(localStoragChatId).then(() => {
          this.props.initalizeFrequencyLists(this.props.chatId)
          .then(() => {
            this.setState({loaded: true, loading: false});
          });
        })
      } else {
        this.props.initalizeFrequencyLists(this.props.chatId)
            .then(() => {
              this.setState({loaded: true, loading: false});
            });
        }
    }
  }

  render() {
    return (
      <div>
        <Wordheader/>
        {this.state.loaded ?
          <div>
            { this.props.vizType == 'wordcloud' ? <Wordcloud/> : <Bargraph/> }
          </div>
          : false
        }
        {/* <span> {this.state.error} </span> */}
        {/* loading */}
        {this.state.loading
          ? <div id="wordLoader" className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
          : false
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VizWizard);