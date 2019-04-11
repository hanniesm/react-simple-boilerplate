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

// Add client info to clientList to keep track of the client
// client is the socket instance of that client
// clientInfo is the object containing id, username, color

const clientList = {};

// Generate a random hex color
const getColor = () => {
  return `#${uuidv4().slice(0, 6)}`;
};

const addClient = (client, clientInfo) => {
  // Adding a new entry into the clientList object
  clientList[clientInfo.id] = {
    id: clientInfo.id,
    name: clientInfo.name,
    color: clientInfo.color,
  };

  // Keeping the id on the instance of the ws client
  client.id = clientInfo.id;
};

const connectClient = (client, nbClients) => {
  const clientId = uuidv4();

  // Creating a message object containing the client info
  const infoMsg = {
    id: clientId,
    name: `Anonymous${nbClients}`,
    color: getColor(),
    type: 'incomingClientInfo',
  };

  // Adding the client info to the clientList object
  addClient(client, infoMsg);

  // Sending back to client the id, username, and color
  client.send(JSON.stringify(infoMsg));
};


wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    //if (client.readyState === SocketServer.OPEN) {
    client.send(data);
    //}
  });
};

wss.on('connection', (ws) => {
  connectClient(ws, wss.clients.size);
  const serverMsg = {
    type: 'nbClients',
    nbClients: wss.clients.size
  }
  wss.broadcast(JSON.stringify(serverMsg));

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
