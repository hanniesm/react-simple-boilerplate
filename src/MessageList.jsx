import React from 'react';
import Message from './Message.jsx';

const MessageList = ({ messages, notification }) => {
  console.log(messages)

  const messageList = messages.map(message => (
    <Message key={message.id} name={message.name} content={message.content} />
  ));

  return (
    <main className="messages">
        {messageList}
      <div className="message system">
        <div className="notification">
          <span className="notification-content">{notification}</span>
        </div>
      </div>
    </main>
  )
}


export default MessageList;

