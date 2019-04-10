import React from 'react';

const Notification = ({ notification }) => {
    return (
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
    );
  };
  
  export default Message;