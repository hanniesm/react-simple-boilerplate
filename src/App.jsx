import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
constructor(props) {
  super(props)

  this.state = {
    messages: []
  }
}
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
       <MessageList />
       <ChatBar />
     </div>
    );
  }
}
export default App;