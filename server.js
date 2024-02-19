// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const morgan=require('morgan');
const path=require('path');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
require('dotenv').config()

//Routers
const demoRouter = require('./routers/home.js');
const AuthAndProfile=require('./routers/AuthRoutes.js');
const profile=require('./routers/profile.js')
require('./Schema/conn.js')


//server creation
const app = express();
const server = http.createServer(app);


const io = socketIo(server,{
    connectionStateRecovery: {
      // the backup duration of the sessions and the packets
      maxDisconnectionDuration: 2 * 60 * 1000,
      // whether to skip middlewares upon successful recovery
      skipMiddlewares: true,
    }
  });

morgan.token('host', function(req, res) {
  // console.log(req.url );
    return req.url+ ' ' +req.hostname;
    });

    //Pages serve
    const filePath = path.join(__dirname, 'views', 'Html');

    //body parser
    app.use(bodyParser.urlencoded({ extended: false }))

    //cookie parser
    app.use(cookieParser())

    app.use(express.static(path.resolve(__dirname, 'views',)));
    // app.use(express.static(path.resolve(__dirname, 'views', 'public')));

    app.use(morgan(':method :host :status  :res[content-length] - :response-time ms'))
    
    // Set up middleware to pass io to the routes
    // app.use((req, res, next) => {
    //   req.io = io;
    //   next();
    // });
    
    // Set up middleware, routes, and Socket.IO events
    app.use(express.json());
    
    //specific routes
    app.use('/', demoRouter(io));
    app.use('/',AuthAndProfile);
    app.use('/',profile);
    // app.use('/',SocketConn);
    
    // Custom middleware for handling 404 errors
    app.use((req, res) => {
      res.status(404).sendFile(filePath+'/404.html');
    });


    
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
