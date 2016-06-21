import { AppRegistry } from 'react-native';
import { PreviewComponent } from '@kadira/react-native-storybook';
import './config';

AppRegistry.registerComponent('__MY_ROOT_COMPONENT_NAME__', function () {
  return PreviewComponent({port: 9001, host: 'localhost'});
});
