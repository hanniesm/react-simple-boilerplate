Chatty App
=====================

A simple React chat app.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:3000/>.
4. Go to <http://localhost:3000/> in your browser.
5. You will also need to start the websocket server from the chatty_server folder. 

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* And lots of others - check the Package.JSON

## Functionality
You can open multiple instances of this app. When a message is posted in one it will be broadcast to others. 
A user will be assigned an alias of Anonymous plus the number of clients connected at time he/she connects. They will also be assigned a random colour. When they post a message their name will appear in the designated colour.
The user can change their name by inserting a new name in the ChatBar.
The user can post messages with images, which will be displayed beneath the message. NB currently you can only use images with an http or https protocol. 

## Screenshots

!["Screenshot of chattyApp](https://raw.githubusercontent.com/hanniesm/react-simple-boilerplate/master/src/docs/App_screenshot.png)
