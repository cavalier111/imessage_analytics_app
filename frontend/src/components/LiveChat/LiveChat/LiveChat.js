import React, { Component } from 'react';
import InitChat from '../InitChat'
import Chat from '../Chat'
import WebSocketInstance from '../../../services/WebSocket'
import { v4 as uuidv4 } from 'uuid';

export default class LiveChat extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasJoinedChat: false,
      chatUUID: '',
    };
  }

  startChat = (nickname, chatUUID) => {
    console.log("in livechat", chatUUID);
    WebSocketInstance.connect(chatUUID);
    this.setState({ nickname: nickname, chatUUID: chatUUID, hasJoinedChat: true });
  }

  render() {
    const {
      chatUUID,
      nickname,
      hasJoinedChat
    } = this.state;

    return (
      <div className="App">
          {
            hasJoinedChat ?
               <Chat
                currentUser={nickname}
                chatId={chatUUID}
              />
              :
              <InitChat
                onSubmit={this.startChat}
              />
          }
      </div>
    );
  }
}


// import React, { Component } from 'react';
// import InitChat from '../InitChat'
// import Chat from '../Chat'
// import WebSocketInstance from '../../../services/WebSocket'

// export default class LiveChat extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//       username: '',
//       loggedIn: false
//     };
//   }

//   handleLoginSubmit = (username) => {
//     this.setState({ loggedIn: true, username: username });
//     WebSocketInstance.connect();
//   }

//   render() {
//     const { 
//       loggedIn,
//       username
//     } = this.state;

//     return (
//       <div className="App">
//         { 
//           loggedIn ?
//           <Chat
//             currentUser={username}
//           />
//           :
//           <InitChat
//             onSubmit={this.handleLoginSubmit}
//             usernameChangeHandler={this.usernameChangeHandler}
//           />
//         }
//       </div>
//     );
//   }
// }