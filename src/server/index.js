import path from 'path';
import http from 'http';
import express from 'express';
import socketio from 'socket.io';

//  ------------------------------------------------------------------------  //

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

//  ------------------------------------------------------------------------  //

const server = http.Server(app);
const io = socketio(server);

io.on('connection', function (socket) {
  socket.on('init', function (msg) {
    const clientType = msg.type;
    socket.join(clientType);

    // device ==> browser
    if (clientType === 'device') {
      ['setStories', 'addAction', 'selectStory', 'applyShortcut'].forEach(type => {
        socket.on(type, m => io.sockets.in('browser').emit(type, m));
      });
    }

    // browser ==> device
    if (clientType === 'browser') {
      ['getStories', 'selectStory'].forEach(type => {
        socket.on(type, m => io.sockets.in('device').emit(type, m));
      });
    }
  });
});

//  ------------------------------------------------------------------------  //

export default server;
