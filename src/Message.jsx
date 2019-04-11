import React from 'react';

const Message = ({ name, content, type }) => {
  if (type === "message") {    
    return (
      <div className="message">
        <span className="message-username">{name}</span>
        <span className="message-content">{content}</span>
      </div>
    );
  }
  if (type === "notification") {
    return (
      <div className="message system">
        <div className="notification">
          <span className="notification-content">{content}</span>
        </div>
      </div>
    )
  }
};

export default Message;
