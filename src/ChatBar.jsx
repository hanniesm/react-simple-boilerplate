import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      name: '',
      content: '',
    }
}

setUserName = (event) => {
  if (event.target.value) {
    this.setState({name: event.target.value})
  }
}

setContent = (event) => {
  this.setState({content: event.target.value})
}

onEnter = (event) => {
  if (event.key === 'Enter') {
    this.props.handleSubmit(this.state)
  }
}

  render() {
    return (
      <footer className='chatbar'>
        <input 
          className='chatbar-username' 
          type='text' 
          placeholder='Your Name (Optional)' 
          name='username' 
          onChange={this.setUserName} 
          onKeyPress={this.onEnter} />
        <input 
          className='chatbar-message' 
          placeholder='Type a message and hit ENTER' 
          name='content' 
          onChange={this.setContent} 
          onKeyPress={this.onEnter} />
      </footer>
    );
  }
}

export default ChatBar;
