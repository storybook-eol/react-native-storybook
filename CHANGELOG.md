# CHANGELOG

## v1.12.1

* Disable react warnings (these should be handled in storybook-ui repo)

## v1.12.0

* Add qr-code preview option [PR #49](https://github.com/kadirahq/react-native-storybook/pull/49).

## v1.11.3

* Make `addDecorator` return `this` to make it chainable [PR #47](https://github.com/kadirahq/react-native-storybook/pull/47).

## v1.11.2

* Get rid of the 'unique key prop' warning

## v1.11.1

* Add missing imports for `storybook build` command

## v1.11.0

* Rewrite most of the code to avoid unnecessary event emitters
* Improve code organization and haow it handles storybook config
* Implement `linkTo` feature.

## v1.10.1

* Tweak appetize.io preview (remove frame and autoplay)

## v1.10.0

* Remove android build from the build command [PR #41](https://github.com/kadirahq/react-native-storybook/pull/41).

## v1.9.0

* Abstract the communication layer (as "channels") and add firebase support
* Add in-browser preview with appetize
* Add storybook favicon

## v1.8.0

* Introduce getStorybookUI method to get the UI component class.

## v1.7.2

* Update README related to HMR usage.

## v1.7.1

* Make the getting started process simple.

## v1.7.0

- Minify the manager build to around 350 KB with UglifyJs support.

## v1.6.0

- Add run-ios command [PR #27](https://github.com/kadirahq/react-native-storybook/pull/27).

## v1.5.0

- Pass the context variable [PR #26](https://github.com/kadirahq/react-native-storybook/pull/26).

## v1.4.0

- Implement action logger feature [PR #25](https://github.com/kadirahq/react-native-storybook/pull/25).

## v1.3.0

- Implement decorators feature [PR #24](https://github.com/kadirahq/react-native-storybook/pull/24).

## v1.2.1

- Fix bug where web UI crashes when starting with selection query params [PR #21](https://github.com/kadirahq/react-native-storybook/pull/21).

## v1.2.0

- Support addons [PR #20](https://github.com/kadirahq/react-native-storybook/pull/20).

## v1.1.4

- Add missing `module` argument to template [PR #18](https://github.com/kadirahq/react-native-storybook/pull/18).

## v1.1.3

- Remove socket.io and use plain Websockets [PR #17](https://github.com/kadirahq/react-native-storybook/pull/17). Removes JS debugging requirement.

## v1.1.2

- Partially fix hot module reloading [Issue #8](https://github.com/kadirahq/react-native-storybook/issues/8) with [PR #10](https://github.com/kadirahq/react-native-storybook/pull/10)

## v1.1.1

- Build source files and write README

## v1.1.0

- Replace `PreviewContainer` with `PreviewComponent` where the host and port are configurable

## v1.0.4

- Fix socket.io by using a patched socket.io temporarily [PR #2](https://github.com/kadirahq/react-native-storybook/pull/2)

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
