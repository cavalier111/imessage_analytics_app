import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Init.scss';

export default class InitForm extends Component {

  constructor(props) {
      super(props);
      this.state = {
        username: '',
        chatUUID: '',
      };
    }

  usernameChangeHandler = (event) =>  {
    this.setState({
      username: event.target.value
    })
  }

  chatUUIDChangeHandler = (event) =>  {
    this.setState({
      chatUUID: event.target.value
    })
  }

  createChat = () => {
    this.startChat(uuidv4());
  }

  joinChat = () => {
    this.startChat();
  }

  startChat = (chatUUID) => {
    this.props.onSubmit(this.state.username, chatUUID);
  }

  render() {

    return (
      <div className="login">
        <div>
          <h1>Start a chat room</h1>
          <form onSubmit={this.createChat} className="form">
             <input
                type="text"
                onChange={this.usernameChangeHandler}
                placeholder="Enter a display name for the chat"
                required />
              <button className="submit" type="submit" value="Submit">
                Create Chat
              </button>
           </form>
        </div>

        <div>
          <h1>Join a chat room</h1>
          <form onSubmit={this.joinChat} className="form">
             <input
                type="text"
                onChange={this.usernameChangeHandler}
                placeholder="Enter a display name for the chat"
                required />
              <input
                type="text"
                onChange={this.chatUUIDChangeHandler}
                placeholder="Enter the chat ID you want to join"
                required />
              <button className="submit" type="submit" value="Submit">
                Join Chat
              </button>
           </form>
        </div>
      </div>
    );
  }
}
