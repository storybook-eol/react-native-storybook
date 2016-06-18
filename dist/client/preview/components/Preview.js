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

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Preview)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.socket = null;
    _this.state = { selection: null };
    return _this;
  }

  _createClass(Preview, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // this fixes the window.navigator.userAgent issue
      // TODO: find out why it's working when set this way
      var io = require('socket.io-client/socket.io');

      // new connection
      this.socket = io(this.props.address, { jsonp: false });

      // initial setup
      this.socket.emit('init', { type: 'device' });
      this.socket.emit('setStories', { stories: this.props.stories.dump() });

      // listen for events
      this.socket.on('getStories', function (msg) {
        // FIXME this will send stories list to all browser clients
        //       these clients may or may not re render the list but
        //       anyways it's best not to send unnecessary messages
        _this2.socket.emit('setStories', { stories: _this2.props.stories.dump() });
      });
      this.socket.on('selectStory', function (msg) {
        var kind = msg.kind;
        var story = msg.story;

        _this2.setState({ selection: { kind: kind, story: story } });
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