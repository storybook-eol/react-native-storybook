# React Native Storybook

With React Native Storybook you can design and develop individual React Native components without running your app.

![React Storybook Screenshot](docs/assets/readme/screenshot.png)

## Getting Started

First, install the `@kadira/react-native-storybook` into your project.

```shell
npm i -D @kadira/react-native-storybook
```

Then render our `StorybookUI` component as the root component by editing your `index.ios.js` or `index.android.js` file as shown follow:

```js
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@kadira/react-native-storybook';

// import your stories
configure(() => {
  require('./src/stories');
}, module)

AppRegistry.registerComponent('YOUR_PROJECT_NAME', function () {
  // You can also render the StorybookUI component anywhere you like.
  const StorybookUI = getStorybookUI({port: 9001, host: 'localhost'});
  return StorybookUI;
});
```

Then write your first story in the `src/stories/` directory like this:

```js
// index.js

import React from 'react';
import { storiesOf } from '@kadira/react-native-storybook';
import { View, Text } from 'react-native';

const style = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF'
};

const CenteredView = (props) => (
  <View style={style}>
    {props.children}
  </View>
);

storiesOf('CenteredView')
  .add('default view', () => (
    <CenteredView>
      <Text>Hello Storybook</Text>
    </CenteredView>
  ));
```

Then add following NPM script into your `package.json` file:

```js
{
  "scripts": {
    ...
    "storybook": "storybook start -p 9001"
    ...
  }
}
```

After that run the storybook server like this:

```
npm run storybook
```

> This will start the storybook server at port: 9001

Finally, you can run your app as usually.

```
react-native run-ios
# or
react-native run-android
```

Now, you can open <http://localhost:9001> to access your stories.

## Running storybook as a separate app

There are a couple of drawbacks with the previous method.

- Both your react native application and the storybook use the same app name. Because of this, only one of them can exist on a device at any given moment.
- Should edit `index.__.js` files when switching between the app and the storybook.

React Native Storybook can be run without making changes to your `index.__.js` files. It has few more steps, but you can setup in few minutes.

- [Setup React Native Storybook with iOS](docs/setup-ios.md)
- [Setup React Native Storybook with Android](docs/setup-android.md)

## Connecting Devices

In order to work with React Native Storybook, one or more devices should be connected. Stories will only show when devices are available.

### iOS simulator

- Start with `react-native run-ios`

### Android emulator

- Get your AVD name with `emulator -list-avds`
- Start the emulator `emulator -avd MY_AVD_NAME`
- Forward port 8081 `adb reverse tcp:8081 tcp:8081`
- Forward port 9001 `adb reverse tcp:9001 tcp:9001`
- Start with `react-native run-android`

### Android device

- Connect your device with adb
- Forward port 8081 `adb reverse tcp:8081 tcp:8081`
- Forward port 9001 `adb reverse tcp:9001 tcp:9001`
- Start with `react-native run-android`
