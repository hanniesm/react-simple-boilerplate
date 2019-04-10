import React from 'react';

const Message = ({ name, content }) => {
  return (
    <div className="message">
      <span className="message-username">{name}</span>
      <span className="message-content">{content}</span>
    </div>
  );
};

export default Message;