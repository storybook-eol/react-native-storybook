"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kind = function () {
  function Kind(stories, addons, decorators, kind) {
    _classCallCheck(this, Kind);

    this.kind = kind;
    this._stories = stories;
    this._decorators = decorators.slice();
    Object.assign(this, addons);
  }

  _createClass(Kind, [{
    key: "addDecorator",
    value: function addDecorator(decorator) {
      this._decorators.push(decorator);
    }
  }, {
    key: "add",
    value: function add(story, fn) {
      var decorated = this._decorate(fn);
      this._stories.add(this.kind, story, decorated);
      return this;
    }
  }, {
    key: "_decorate",
    value: function _decorate(fn) {
      return this._decorators.reduce(function (decorated, decorator) {
        return function (context) {
          var _fn = function _fn() {
            return decorated(context);
          };
          return decorator(_fn, context);
        };
      }, fn);
    }
  }]);

  return Kind;
}();

exports.default = Kind;