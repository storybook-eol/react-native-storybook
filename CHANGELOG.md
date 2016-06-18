# CHANGELOG

## v1.0.3

- Fix `window.navigator.userAgent` related issue with socket.io [Issue #1](https://github.com/kadirahq/react-native-storybook/issues/1)

## v1.0.2

- Rename storybook command file from `cli.js` to `storybook.js`

## v1.0.1

- Add missing dependency `commander` to package.json file

## v1.0.0

This is the initial non-poc release of `react-native-storybook`. With this release, users can write stories and check them using an ios-simulator. The address of the storybook `localhost:9001` is hardcoded so for now it does not work on real devices or the android simulator. Also it is not contributor friendly. When used with `npm link`, the node_modules directory should be removed when using the ios simulator.

 - Support ability to write stories using `storiesOf` and `add` without using decorators or addons
 - The storybook can be started with `storybook start -h localhost -p 9001` although the port and host should be as given in this example
 - The story preview device can be started with the `react-native run-ios` command but the apps `index.*.js` must be edited (for now)
