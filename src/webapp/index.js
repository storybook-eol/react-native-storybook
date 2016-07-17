import path from 'path';
import debug from 'debug';
import express from 'express';
import http from 'http';
import ws from 'ws';
import getIndexPage from './pages/index.html.js';

export default class WebApp {
  constructor(config) {
    this._log = debug(`webapp`);
    this._config = config;
    this._httpServer = http.createServer();
    this._expressApp = express();
    const staticPath = path.resolve(__dirname, 'public');
    this._expressApp.use(express.static(staticPath, { index: false }));
    this._expressApp.get('/', (req, res) => res.end(this.getHTML()))
    this._httpServer.on('request', this._expressApp);
    if (this._config.channel.type === 'websocket') {
      this._websocketServer = ws.Server({server: this._httpServer});
      this._websocketServer.on('connection', s => this.handleWS(s));
    }
  }

  getHTML() {
    return getIndexPage(this._config);
  }

  handleWS(socket) {
    this._log(`new websocket connection`);
    socket.on('message', data => {
      this._websocketServer.clients
        .forEach(client => client.send(data));
    });
  }

  listen() {
    return new Promise((resolve, reject) => {
      const { port, host } = this._config.webapp;
      this._httpServer.listen(port, host, function (err) {
        return err ? reject(err) : resolve(null);
      });
    });
  }
}
