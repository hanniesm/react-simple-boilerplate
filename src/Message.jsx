import React from 'react';

const Message = ({ name, color, content, type }) => {
  if (type === "message") {    
    const contentBits = content.split(' ');
    let contentList = []
    let imageList = [];
    for (const bit in contentBits) {
      if (contentBits[bit].slice(0,4) === "http") {
        imageList.push(contentBits[bit])
      } else {
        contentList.push(contentBits[bit])
      }
    }
    return (
      <div>
        <div className="message"> 
          <span className="message-username" style={{color:`${color}`}}>{name}</span>
          <div className="message-content">
            <span className>{contentList.join(" ")}</span>
            <span className="message-image"><img src={imageList[0]}/></span>
          </div>
          
        </div>
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
