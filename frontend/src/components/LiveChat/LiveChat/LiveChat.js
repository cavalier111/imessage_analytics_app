import React, { Component } from 'react';
import InitChat from '../InitChat'
import Chat from '../Chat'
import WebSocketInstance from '../../../services/WebSocket'
import { v4 as uuidv4 } from 'uuid';

export default class LiveChat extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      hasJoinedChat: false,
      chatUUID: '',
    };
  }

  startChat = (username, chatUUID) => {
    this.setState({ username: username, chatUUID: chatUUID, hasJoinedChat: true });
  }

  render() {
    const { 
      username,
      hasJoinedChat
    } = this.state;

    return (
      <div className="App">
          {
            hasJoinedChat ?
               <Chat
                currentUser={username}
                chatId={chatUUID}
              />
              :
              <InitChat
                onSubmit={this.startChat}
                usernameChangeHandler={this.usernameChangeHandler}
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