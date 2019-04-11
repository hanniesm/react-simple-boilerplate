const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    //if (client.readyState === SocketServer.OPEN) {
    client.send(data);
    //}
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', msg => {
    // incoming message needs to parsed
    const clientMsg = JSON.parse(msg);    
  // do something according to the message type
      switch (clientMsg.type) {
        case 'postMessage':
          // adding an id and a type to the message and send it back
          clientMsg.type = 'incomingNewMessage';
          clientMsg.id = uuidv4();
          wss.broadcast(JSON.stringify(clientMsg));
  
          break;
        case 'postNotification':
          clientMsg.type = 'incomingNotification';
          clientMsg.id = uuidv4();
          wss.broadcast(JSON.stringify(clientMsg));

          break;
        default:
          console.log('unknown message type');
      }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

// When a client sends a message
