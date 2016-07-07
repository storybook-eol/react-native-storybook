import 'es6-shim';
import render from '@kadira/storybook-ui';
import Provider from './provider';

const config = window.STORYBOOK_CONFIG || {};
config.channel = config.channel || {
  type: 'websocket',
  options: { address: `ws://${location.host}` },
};

const root = document.getElementById('root');
render(root, new Provider(config));
