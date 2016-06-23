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
  }

  _createClass(ClientApi, [{
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
      return new KindApi(this._stories, this._addons, kind);
    }
  }]);

  return ClientApi;
}();

exports.default = ClientApi;

var KindApi = exports.KindApi = function () {
  function KindApi(stories, addons, kind) {
    _classCallCheck(this, KindApi);

    this.kind = kind;
    this._stories = stories;
    Object.assign(this, addons);
  }

  _createClass(KindApi, [{
    key: 'add',
    value: function add(story, fn) {
      this._stories.add(this.kind, story, fn);
      return this;
    }
  }]);

  return KindApi;
}();