"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StoryStore = function () {
  function StoryStore() {
    _classCallCheck(this, StoryStore);

    this.data = {};
  }

  _createClass(StoryStore, [{
    key: "add",
    value: function add(kind, story, fn) {
      this.data[kind] = this.data[kind] || { stories: {} };
      this.data[kind].stories[story] = fn;
    }
  }, {
    key: "get",
    value: function get(kind, story) {
      return this.data[kind] && this.data[kind].stories[story];
    }
  }, {
    key: "dump",
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
}();

exports.default = StoryStore;