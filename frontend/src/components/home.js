import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { initalizeFrequencyLists, reloadChatsMetaData } from "../redux/actions/word";
import Upload from './upload';
import VizWizard from './vizWizard';
import ChatSelector from './chatSelector';
import './App.css'
import './home.css'
import './loader.scss';
import axiosInstance from '../axiosApi'
import Button from '@material-ui/core/Button';
import { Route, Redirect } from 'react-router-dom';

const mapDispatchToProps = (dispatch) => {
  return {
    initalizeFrequencyLists: frequencyLists => dispatch(initalizeFrequencyLists(frequencyLists)),
    reloadChatsMetaData: () => dispatch(reloadChatsMetaData()),
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      chatId: null,
    };
  }

  componentDidMount() {
    this.props.reloadChatsMetaData();
  }

  viewVizualizations = () => {
    this.setState({loading: true});
    axiosInstance.get("texts/frequencyList/"+this.state.chatId)
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

  deleteChat = () => {
    axiosInstance.delete("texts/frequencyList/"+this.state.chatId)
      .catch(error => {
        this.setState({
          error: error.message
        });
      })
      .then(() => this.props.reloadChatsMetaData())
  }

  render() {
    return (
      <div>
        {/* initial */}
        {(this.state.loading || this.state.loaded) ? false :
          <div>
            <h1>Use an existing chat</h1>
            <ChatSelector handleChatChange={(chatId) => this.setState({'chatId': chatId})}/>
            <Button type="submit" className="chat-stat-button button-margin-right" onClick={() => this.viewVizualizations()}>Start</Button>
            <Button type="submit" className="chat-stat-button" onClick={() => this.deleteChat()}>Delete</Button>
            <h1>Upload a new chat</h1>
            <Upload viewVizualizations={this.viewVizualizations} />
            {/*<button type="submit" onClick={() => this.mockData()}>mock</button>
            <button type="submit" onClick={() => this.setState({loaded: true, loading: false})}>Start Mock</button>*/}
          </div>
        }
        {/* loading */}
        {this.state.loading
          ? <div id="wordLoader" className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
          : false
        }
        {/* loaded */}
        {this.state.loaded ? <Redirect to="/view-viz" /> : false}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Home);