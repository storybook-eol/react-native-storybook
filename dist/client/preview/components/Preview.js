'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CenteredText = require('./CenteredText');

var _CenteredText2 = _interopRequireDefault(_CenteredText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preview = function (_Component) {
  _inherits(Preview, _Component);

  function Preview() {
    var _Object$getPrototypeO;

    _classCallCheck(this, Preview);

    for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Preview)).call.apply(_Object$getPrototypeO, [this].concat(props)));

    _this.socket = null;
    _this.state = { selection: null };
    return _this;
  }

  _createClass(Preview, [{
    key: 'selectStory',
    value: function selectStory(_ref) {
      var kind = _ref.kind;
      var story = _ref.story;

      this.setState({ selection: { kind: kind, story: story } });
    }
  }, {
    key: 'sendInit',
    value: function sendInit() {
      this.socket.send(JSON.stringify({ type: 'init', data: { clientType: 'device' } }));
    }
  }, {
    key: 'sendAddAction',
    value: function sendAddAction(action) {
      this.socket.send(JSON.stringify({ type: 'addAction', data: { action: action } }));
    }
  }, {
    key: 'sendSetStories',
    value: function sendSetStories() {
      var stories = this.props.stories.dump();
      // FIXME this will send stories list to all browser clients
      //       these clients may or may not re render the list but
      //       anyways it's best not to send unnecessary messages
      this.socket.send(JSON.stringify({ type: 'setStories', data: { stories: stories } }));
    }
  }, {
    key: 'handleMessage',
    value: function handleMessage(message) {
      switch (message.type) {
        case 'getStories':
          this.sendSetStories();
          break;
        case 'selectStory':
          this.selectStory(message.data);
          break;
        default:
          console.error('unknown message type:', message.type, message);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // new connection
      this.socket = new WebSocket(this.props.address);

      // initial setup
      this.socket.onopen = function () {
        _this2.sendInit();
        _this2.sendSetStories();
      };

      // listen for events
      this.socket.onmessage = function (e) {
        var message = JSON.parse(e.data);
        _this2.handleMessage(message);
      };

      // an error occurred
      this.socket.onerror = function (e) {
        console.warn('websocket connection error', e.message);
      };

      // connection closed
      this.socket.onclose = function (e) {
        console.warn('websocket connection closed', e.code, e.reason);
      };

      // listen for story changes
      this.props.stories.on('change', function () {
        _this2.sendSetStories();
      });

      // listen for action triggers
      this.props.actions.on('action', function (action) {
        _this2.sendAddAction(action);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.selection) {
        return _react2.default.createElement(
          _CenteredText2.default,
          null,
          'Welcome to Storybook!'
        );
      }
      var _state$selection = this.state.selection;
      var kind = _state$selection.kind;
      var story = _state$selection.story;

      return this.props.stories.get(kind, story)();
    }
  }]);

  return Preview;
}(_react.Component);

Preview.propTypes = {
  address: _react2.default.PropTypes.string.isRequired,
  stories: _react2.default.PropTypes.object.isRequired
};
exports.default = Preview;