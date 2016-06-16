"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;
exports.storiesOf = storiesOf;
function configure(loaders) {
  loaders();
}

var StoryStore = exports.StoryStore = {};
function storiesOf(kind) {
  var decorators = [];
  var api = {};

  api.add = function (story, getStory) {
    // Wrap the getStory function with each decorator. The first
    // decorator will wrap the story function. The second will
    // wrap the first decorator and so on.
    var fn = decorators.reduce(function (decorated, decorator) {
      return function () {
        return decorator(decorated);
      };
    }, getStory);

    // Add the fully decorated getStory function.
    StoryStore[kind] = StoryStore[kind] || { stories: {} };
    StoryStore[kind].stories[story] = fn;
    return api;
  };

  return api;
}