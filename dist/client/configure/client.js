'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClientApi = function () {
  function ClientApi(stories) {
    _classCallCheck(this, ClientApi);

    this._stories = stories;
    this._addons = {};
    this._decorators = [];
  }

  _createClass(ClientApi, [{
    key: 'addDecorator',
    value: function addDecorator(decorator) {
      this._decorators.push(decorator);
    }
  }, {
    key: 'setAddon',
    value: function setAddon(addon) {
      Object.assign(this._addons, addon);
    }
  }, {
    key: 'configure',
    value: function configure(loaders, module) {
      var _this = this;

      loaders();
      if (module.hot) {
        module.hot.accept(function () {
          return _this._stories.emit('change');
        });
      }
    }
  }, {
    key: 'storiesOf',
    value: function storiesOf(kind) {
      return new KindApi(this._stories, this._addons, this._decorators, kind);
    }
  }]);

  return ClientApi;
}();

exports.default = ClientApi;

var KindApi = exports.KindApi = function () {
  function KindApi(stories, addons, decorators, kind) {
    _classCallCheck(this, KindApi);

    this.kind = kind;
    this._stories = stories;
    this._decorators = decorators.slice();
    Object.assign(this, addons);
  }

  _createClass(KindApi, [{
    key: 'addDecorator',
    value: function addDecorator(decorator) {
      this._decorators.push(decorator);
    }
  }, {
    key: 'add',
    value: function add(story, fn) {
      var decorated = this._decorate(fn);
      this._stories.add(this.kind, story, decorated);
      return this;
    }
  }, {
    key: '_decorate',
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

  return KindApi;
}();