'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorybookUI = exports.PreviewComponent = undefined;
exports.action = action;
exports.linkTo = linkTo;
exports.addDecorator = addDecorator;
exports.setAddon = setAddon;
exports.configure = configure;
exports.storiesOf = storiesOf;
exports.configureUI = configureUI;
exports.getStorybookUI = getStorybookUI;

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preview = new _preview2.default();

function action(name) {
  return preview.newAction(name);
}

function linkTo(kind, story) {
  return preview.newLink(kind, story);
}

function addDecorator(decorator) {
  return preview.addDecorator(decorator);
}

function setAddon(addon) {
  return preview.setAddon(addon);
}

function configure(loadStories, module) {
  loadStories();
  if (module && module.hot) {
    module.hot.accept(function () {
      return preview.sendSetStories();
    });
    // TODO remove all global decorators on dispose
  }
}

function storiesOf(kind, module) {
  if (module && module.hot) {
    // TODO remove the kind on dispose
  }
  return preview.newKind(kind);
}

// export API to override user configurations
// useful when building using CI servers.
// This will also freeze configurations.
function configureUI(config) {
  // NOTE: for backward compatibility
  if (config.host || config.port) {
    config.host = config.host || 'localhost';
    config.port = config.port || 9001;
    preview.configure({
      channel: {
        type: 'websocket',
        options: {
          url: 'ws://' + config.host + ':' + config.port
        }
      }
    });
    delete config.host;
    delete config.port;
  }
  preview.configure(config);
  preview.freezeConfig();
  preview.startChannel();
}

// returns a (stateless) react component for the UI
function getStorybookUI() {
  var customConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  configureUI(customConfig);
  return function () {
    return preview.renderPreview();
  };
}

// NOTE: for backward compatibility
var PreviewComponent = exports.PreviewComponent = getStorybookUI;
var StorybookUI = exports.StorybookUI = getStorybookUI;