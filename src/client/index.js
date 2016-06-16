export function configure(loaders) {
  loaders();
}

export const StoryStore = {};
export function storiesOf(kind) {
  const decorators = [];
  const api = {};

  api.add = (story, getStory) => {
    // Wrap the getStory function with each decorator. The first
    // decorator will wrap the story function. The second will
    // wrap the first decorator and so on.
    const fn = decorators.reduce((decorated, decorator) => {
      return () => decorator(decorated);
    }, getStory);

    // Add the fully decorated getStory function.
    StoryStore[kind] = StoryStore[kind] || {stories: {}};
    StoryStore[kind].stories[story] = fn;
    return api;
  };

  return api;
}
