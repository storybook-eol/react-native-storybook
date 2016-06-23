import { configure } from '@kadira/react-native-storybook';

configure(function () {
  require('/path/to/my/story-1');
  require('/path/to/my/story-2');
}, module);
