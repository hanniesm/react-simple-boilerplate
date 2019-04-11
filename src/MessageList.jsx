import React from 'react';
import Message from './Message.jsx';

const MessageList = ({ messages }) => {
  const messageList = messages.map(message => (
    <Message key={message.id} name={message.name} color={message.color} content={message.content} type={message.type}/>
  ));

  return (
    <main className="messages">
        {messageList}
    </main>
  )
}


export default MessageList;

