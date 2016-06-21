'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StoryStore = function (_EventEmitter) {
  _inherits(StoryStore, _EventEmitter);

  function StoryStore() {
    var _Object$getPrototypeO;

    _classCallCheck(this, StoryStore);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(StoryStore)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.data = {};
    return _this;
  }

  _createClass(StoryStore, [{
    key: 'add',
    value: function add(kind, story, fn) {
      this.data[kind] = this.data[kind] || { stories: {} };
      this.data[kind].stories[story] = fn;
    }
  }, {
    key: 'get',
    value: function get(kind, story) {
      return this.data[kind] && this.data[kind].stories[story];
    }
  }, {
    key: 'dump',
    value: function dump() {
      var dump = [];
      for (var kind in this.data) {
        if (!this.data.hasOwnProperty(kind)) {
          continue;
        }
        var stories = this.data[kind].stories;
        var kindInfo = { kind: kind, stories: [] };
        for (var story in stories) {
          if (!stories.hasOwnProperty(story)) {
            continue;
          }
          kindInfo.stories.push(story);
        }
        dump.push(kindInfo);
      }
      return dump;
    }
  }]);

  return StoryStore;
}(_events.EventEmitter);

exports.default = StoryStore;