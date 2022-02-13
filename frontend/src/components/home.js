import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { reloadChatsMetaData, updateChatId } from "../redux/actions/word";
import Upload from './upload';
import VizWizard from './vizWizard';
import ChatSelector from './chatSelector';
import './App.css'
import './home.css'
import './loader.scss';
import axiosInstance from '../axiosApi'
import Button from '@material-ui/core/Button';
import { Route, Redirect } from 'react-router-dom';
import { mockApiResponse } from './constants/mockApiResponse';

const mapDispatchToProps = (dispatch) => {
  return {
    reloadChatsMetaData: () => dispatch(reloadChatsMetaData()),
    updateChatId: (chatId) => dispatch(updateChatId(chatId)),
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      chatId: null,
      // repalce with feature flag
      isUploadFeatureEnabled: process.env.NODE_ENV == 'production' ? false : true,
    };
  }

  componentDidMount() {
    this.props.reloadChatsMetaData();
  }


  viewVizualizations = () => {
    this.props.updateChatId(this.state.chatId);
    this.setState({loaded: true, loading: false});
  }
  
  mockData = () => {
    // Todo refactor for mocks
    // this.props.initalizeMockFrequencyLists();
    this.setState({loaded: true, loading: false});
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
        {/*check if feature flag for uplaoding is turned on*/}
        {!this.state.isUploadFeatureEnabled ? false :
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
          </div>
        }
        {this.state.isUploadFeatureEnabled ? false :
          <div>
            {(this.state.loading || this.state.loaded) ? false :
              <div className="welcome-container">
                <h1 className="welcome-text">Hello! Welcome to ChatStats, an app for seeing data vizualizations for your text messages</h1>
                <h3 className="welcome-text">Uploading is currently in the works! But you can see an example demo in the mean time</h3>
                <Button type="submit" className="chat-stat-button demo-button" onClick={() => this.mockData()}>View demo with mock data</Button>
              </div>
            }
          </div>
        }
        {/* loaded */}
        {this.state.loaded ? <Redirect to="/view-viz" /> : false}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Home);
