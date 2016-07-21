'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _events = require('events');

var _config = require('../config');

var _channel = require('../channel');

var _channel2 = _interopRequireDefault(_channel);

var _kind = require('./utils/kind');

var _kind2 = _interopRequireDefault(_kind);

var _stories = require('./utils/stories');

var stories = _interopRequireWildcard(_stories);

var _actions = require('./utils/actions');

var actions = _interopRequireWildcard(_actions);

var _StoryView = require('./components/StoryView');

var _StoryView2 = _interopRequireDefault(_StoryView);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// We need to pass state from this class to the StoryView component instance
// and make the component render again. As we need to change the state to do
// it and the state can only be changed from the inside of the instance code
// We're going to pass an event emitter. The Preview class cannot be a React
// component because it also needs to expose a couple of methods to the user.
var Preview = function (_EventEmitter) {
  _inherits(Preview, _EventEmitter);

  function Preview() {
    var _Object$getPrototypeO;

    _classCallCheck(this, Preview);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Preview)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this._config = (0, _config.getDefaultConfig)();
    _this._configFrozen = false;
    _this._channel = null;
    _this._stories = new stories.Store();
    _this._addons = {};
    _this._decorators = [];
    _this._selection = null;
    return _this;
  }

  _createClass(Preview, [{
    key: 'configure',
    value: function configure(config) {
      if (!this._configFrozen) {
        Object.assign(this._config, config);
      }
    }
  }, {
    key: 'freezeConfig',
    value: function freezeConfig() {
      this._configFrozen = true;
    }
  }, {
    key: 'startChannel',
    value: function startChannel() {
      var _this2 = this;

      this._channel = new _channel2.default('preview', this._config.channel);
      this._channel.on('getStories', function (d) {
        return _this2.sendSetStories();
      });
      this._channel.on('selectStory', function (d) {
        return _this2.selectStory(d);
      });
      this._channel.connect();
      this.sendSetStories();
    }
  }, {
    key: 'sendAddAction',
    value: function sendAddAction(action) {
      this._channel.send('addAction', { action: action });
    }
  }, {
    key: 'sendSetStories',
    value: function sendSetStories() {
      var stories = this._stories.dump();
      this._channel.send('setStories', { stories: stories });
    }
  }, {
    key: 'sendSelectStory',
    value: function sendSelectStory(kind, story) {
      this._channel.send('selectStory', { kind: kind, story: story });
    }
  }, {
    key: 'setAddon',
    value: function setAddon(addon) {
      Object.assign(this._addons, addon);
    }
  }, {
    key: 'addDecorator',
    value: function addDecorator(decorator) {
      this._decorators.push(decorator);
    }
  }, {
    key: 'newKind',
    value: function newKind(kind) {
      return new _kind2.default(this._stories, this._addons, this._decorators, kind);
    }
  }, {
    key: 'newAction',
    value: function newAction(name) {
      var _this3 = this;

      return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var action = actions.create(name, args);
        _this3.sendAddAction(action);
      };
    }
  }, {
    key: 'newLink',
    value: function newLink(kind, story) {
      var _this4 = this;

      return function () {
        _this4.sendSelectStory(kind, story);
      };
    }
  }, {
    key: 'selectStory',
    value: function selectStory(selection) {
      this._selection = selection;
      var kind = selection.kind;
      var story = selection.story;

      var storyFn = this._stories.get(kind, story);
      this.emit('story', storyFn);
    }
  }, {
    key: 'renderPreview',
    value: function renderPreview() {
      var storyFn = function storyFn() {
        return null;
      };
      if (this._selection) {
        var _selection = this._selection;
        var kind = _selection.kind;
        var story = _selection.story;

        storyFn = this._stories.get(kind, story);
      }
      return _react2.default.createElement(_StoryView2.default, { events: this, storyFn: storyFn });
    }
  }]);

  return Preview;
}(_events.EventEmitter);

exports.default = Preview;