import { expect } from 'chai';
import WebApp from '../';

describe('WebApp', () => {
  describe('listen', function () {
    it('should resolve if http server listening succeeded', async function () {
      const webapp = new WebApp({webapp: {}, channel: {}});
      webapp._httpServer.listen = (port, host, callback) => callback(null);
      let listenError = null;
      try {
        await webapp.listen()
      } catch (e) {
        throw new Error('should not be rejected');
      }
    });

    it('should reject if http server listening failed', async function () {
      const webapp = new WebApp({webapp: {}, channel: {}});
      const expectedError = new Error('test-error');
      webapp._httpServer.listen = (port, host, callback) => callback(expectedError);
      let listenError = null;
      try {
        await webapp.listen()
      } catch (e) {
        expect(e).to.equal(expectedError);
        return;
      }
      throw new Error('should not be resolved');
    });
  });

  describe('getHTML', function () {
    it('should correctly inject config json (stringified)', function () {
      const webapp = new WebApp({webapp: {}, channel: {}});
      const html = webapp.getHTML();
      expect(html).to.contain('"{\\"channel\\":{}}"');
    });
  });

  describe('handleWS', function () {
    it('should forward messages to other typed clients', function () {
      const webapp = new WebApp({webapp: {}, channel: {}});
      const socket = {
        on(type, cb) { type === 'message' && cb('abcd') }
      };
      webapp._websocketServer = {
        clients: [
          {clientType: 't1', data: [], send(data) { this.data.push(data) }},
          {clientType: 't2', data: [], send(data) { this.data.push(data) }},
          {clientType: 't3', data: [], send(data) { this.data.push(data) }},
        ]
      };
      webapp.handleWS(socket);
      expect(webapp._websocketServer.clients[0].data).to.deep.equal(['abcd']);
      expect(webapp._websocketServer.clients[1].data).to.deep.equal(['abcd']);
      expect(webapp._websocketServer.clients[2].data).to.deep.equal(['abcd']);
    });
  });
});
