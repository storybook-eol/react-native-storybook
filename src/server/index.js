import path from 'path';
import http from 'http';
import express from 'express';
import ws from 'ws';

//  ------------------------------------------------------------------------  //

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

//  ------------------------------------------------------------------------  //

const server = http.Server(app);
const wss = ws.Server({server});

wss.on('connection', function (socket) {
  console.log('> new websocket connection');
  socket.data = {clientType: null};

  socket.on('message', function (data) {
    try {
      const message = JSON.parse(data);

      // clients must init first
      if (!socket.data.clientType) {
        if (message.type === 'init') {
          socket.data.clientType = message.data.clientType;
          console.log(`> initialize new "${socket.data.clientType}"`);
          return;
        } else {
          throw new Error('client must init first');
        }
      }

      // forward
      wss.clients
        .filter(client => client.data.clientType !== socket.data.clientType)
        .forEach(client => client.send(data));
    } catch (e) {
      socket.close();
    }
  });
});

//  ------------------------------------------------------------------------  //

export default server;
