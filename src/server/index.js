import path from 'path';
import http from 'http';
import express from 'express';
import ws from 'ws';
import getIndexHTML from './pages/index.html.js';

// avoid eslint errors
const logger = console;

export default function startServer(port, host, config) {
  config.channel = config.channel || {
    type: 'websocket',
    options: { address: `ws://${host}:${port}/` },
  };

  const app = express();
  app.get('/', (req, res) => res.send(getIndexHTML({config})));
  app.use(express.static(path.join(__dirname, 'public')));

  const server = http.Server(app);
  const wss = ws.Server({server});

  // handle websocket (channel) connections
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
        console.error(e);
        socket.close();
      }
    });
  });

  server.listen(port, host, function (err) {
    if (err) throw err;
    const address = `http://${host}:${port}/`;
    logger.info(`\nListening on => ${address}\n`);
  });
}
