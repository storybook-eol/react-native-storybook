export function getDefaultConfig() {
  return {
    channel: {
      type: 'websocket',
      options: {
        url: 'ws://localhost:9001',
      }
    },
    preview: {
      type: 'message',
      options: {
        message: 'Please check your device/emulator',
      },
    },
    webapp: {
      host: 'localhost',
      port: 9001,
    },
  };
}
