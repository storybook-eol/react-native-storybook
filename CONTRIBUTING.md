# Contributing

Thank you for considering contributing to React Native Storybook. There are many ways you can help to improve this project.

## Reporting Issues

No software is bug free. So, if you find an issue, follow these steps:

- To avoid duplicates, first check [known issues](#) and [reported issues](#) and make sure you're running the latest version.
- When creating a new issue, explain the issue briefly in English with screenshots, error logs where they can be useful.
- When reporting bugs, try to include steps to reproduce the bug

## Creating Pull Requests

- Fork the repository
- Create a new branch in your fork
- Make changes and commit them
- Create a new pull request

For new features and major changes, please discuss it with other contributors on a Github issue before starting.

## Contributing Docs

If you find any way to add or improve documentation, create a new pull request (as explained above) with changes.

## Contributing Code

A dev-environment can be setup by following this guide. We will be using the [react-native-button](https://github.com/kadira-samples/react-native-button) repo to preview UI changes made to the storybook.

To get started, clone these repos and install their dependencies.

```
git clone https://github.com/kadirahq/react-native-storybook
(cd react-native-storybook && npm install)
git clone https://github.com/kadira-samples/react-native-button
(cd react-native-button && npm install)
(cd react-native-button && npm install -D ../react-native-storybook)
```

Unfortunately, *npm link* does not work well with *react-native* therefore we have to re-install the local version of *react-native-storybook* after making changes.

```
(cd react-native-button && npm install -D ../react-native-storybook)
```

> **NOTE:** The developer workflow is still a WIP and quite slow. If you have any suggestions to make it work faster, please comment no [this issue](https://github.com/kadirahq/react-native-storybook/issues/14)
