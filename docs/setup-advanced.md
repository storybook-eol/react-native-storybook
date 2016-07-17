# Advanced Configurations

> status: draft

By default storybook is configured for development. It will start a websocket server to exchange messages between the web app and the device (preview app). A device/simulator/emulator is also required to test the storybook.

```js
const config = {
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
}
```

## Use Firebase to communicate

Storybook also supports firebase to exchange messages. This is quite useful when the devices has to connect over the internet.

```js
const config = {
  channel: {
    type: 'firebase',
    options: {
      url: 'https://my-app.firebaseio.com/path/to/ref',
    }
  },
}
```

## Use Appetize to preview storybook

Appetize.io can be used to preview storybook inside the webapp rather than using an emulator. But for this to work properly, the application has to be built with the javascript code bundled into the app.

```js
const config = {
  preview: {
    type: 'appetize',
    options: {
      devices: [
        {type: 'nexus5', pubKey: ''},
        {type: 'iphone6', pubKey: ''},
      ]
    }
  },
}
```
