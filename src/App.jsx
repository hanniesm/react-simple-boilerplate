import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
constructor(props) {
  super(props)

  this.state = {
    loading: true,
    currentUser: {name: '', color: ''},
    messages: [],
    nbClients: 0,
  }
}
  // Event handler triggered when the client connects to the server
  handleOnOpen = event => {
    console.log('Connected to server');
  };

  // Event handler if there is an error
  handleOnError = event => {
    console.log('Error connecting to websocket');
  };

  handleOnMessage = event => {
    // Parse the incoming message. data is acutally in evt.data
    const incomingMessage = JSON.parse(event.data);
    switch (incomingMessage.type) {
      case 'nbClients':
        this.setState({nbClients: incomingMessage.nbClients})
      break;

      case 'incomingClientInfo':
        // getting username from the message object
        const { id, name, color } = incomingMessage;
        //updating the state with username
        this.setState({
          currentUser: { ...this.state.currentUser, id, name, color },
        });
      break;
    
      case 'incomingNewMessage':
        const newMessage = {
          id: incomingMessage.id, 
          type: 'message', 
          name: incomingMessage.name, 
          content: incomingMessage.content, 
          color: incomingMessage.color
        }

        this.setState({ messages: [...this.state.messages, newMessage] })
        
      break;

      case 'incomingNotification':
        const newNotification = {
          id: incomingMessage.id, 
          type: 'notification', 
          name: incomingMessage.name, 
          content: incomingMessage.message
        }

        this.setState({ messages: [...this.state.messages, newNotification] })
      break;

      default: 
        console.log('Unknown type of message');
    }
}

  // Sending an outgoing message to the server
  sendNotification = message => {
    const outgoingMsg = {
      type: 'postNotification',
      message,
    };

    // send is a built-in method on the socket to send the message to the server
    this.socket.send(JSON.stringify(outgoingMsg));
  };

  // Updating the username in the state and
  // sending a notification to server
  updateUsername = name => {
    const message = `${
      this.state.currentUser.name
    } has changed its name to ${name}`;
    // Send a notifaction to the server
    // update the state of App with this new username
    this.sendNotification(message);
    // update the state
    this.setState({
      currentUser: { ...this.state.currentUser, name: name },
    });
  }

  addNewMessage =  (name, content) => {
    let messageName = '';
    if (name === '') {
      messageName = this.state.currentUser.name;
    } else {
      messageName = name;
    }
    
    const newMessage = {
      type: 'postMessage', 
      name: messageName, 
      content: content, 
      color: this.state.currentUser.color
    }
    
    // send is a built-in method on the socket to send the message to the server
    this.socket.send(JSON.stringify(newMessage));
  }
// Like to change this so that if change username it shows the first time they post a message. 
  handleSubmit = ({name, content}) => {
    if (name != this.state.currentUser.name && name != '') {
      this.updateUsername(name)
    }
    if (content != '') {
      this.addNewMessage(name, content)
    }
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    const socketUrl = 'ws://localhost:3001';

    // Creating a new websocket
    this.socket = new WebSocket(socketUrl);

    // Assign the event handlers on this socket
    // onopen, onmessage, onerror
    this.socket.onopen = this.handleOnOpen;

    this.socket.onmessage = this.handleOnMessage;

    this.socket.onerror = this.handleOnError;
  }

  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
          <p className='nbClients'>{this.state.nbClients} users online</p>
        </nav>
       <MessageList messages={this.state.messages} />
       <ChatBar currentUser={this.state.currentUser} handleSubmit={this.handleSubmit}/>
     </div>
    );
  }
}
export default App;
