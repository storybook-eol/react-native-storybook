'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _channel = require('../../shared/channel');

var _channel2 = _interopRequireDefault(_channel);

var _CenteredText = require('./CenteredText');

var _CenteredText2 = _interopRequireDefault(_CenteredText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preview = function (_Component) {
  _inherits(Preview, _Component);

  function Preview(props) {
    var _Object$getPrototypeO;

    _classCallCheck(this, Preview);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Preview)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));

    _this.state = { selection: null };
    _this._channel = (0, _channel2.default)(props.config.channel);
    _this._channel.on('getStories', function (d) {
      return _this.sendSetStories();
    });
    _this._channel.on('selectStory', function (d) {
      return _this.selectStory(d);
    });
    props.stories.on('change', function () {
      return _this.sendSetStories();
    });
    props.actions.on('action', function (action) {
      return _this.sendAddAction(action);
    });
    _this.sendInit();
    _this.sendSetStories();
    return _this;
  }

  _createClass(Preview, [{
    key: 'selectStory',
    value: function selectStory(selection) {
      this.setState({ selection: selection });
    }
  }, {
    key: 'sendInit',
    value: function sendInit() {
      this._channel.send('init', { clientType: 'device' });
    }
  }, {
    key: 'sendAddAction',
    value: function sendAddAction(action) {
      this._channel.send('addAction', { action: action });
    }
  }, {
    key: 'sendSetStories',
    value: function sendSetStories() {
      var stories = this.props.stories.dump();
      this._channel.send('setStories', { stories: stories });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // ...
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.selection) {
        return _react2.default.createElement(
          _CenteredText2.default,
          null,
          'Welcome to Storybook!!'
        );
      }
      var _state$selection = this.state.selection;
      var kind = _state$selection.kind;
      var story = _state$selection.story;

      var getStory = this.props.stories.get(kind, story);
      var context = { kind: kind, story: story };
      return getStory(context);
    }
  }]);

  return Preview;
}(_react.Component);

Preview.propTypes = {
  config: _react2.default.PropTypes.object.isRequired,
  stories: _react2.default.PropTypes.object.isRequired,
  actions: _react2.default.PropTypes.object.isRequired
};
exports.default = Preview;