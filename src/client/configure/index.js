import StoryStore from './store';

export const stories = new StoryStore();

//
export function configure(loaders, module) {
  loaders();

  if (module.hot) {
    module.hot.accept(() => {
      stories.emit('change');
    });
  }
}

//
export function storiesOf(kind) {
  const api = {};
  api.add = (story, fn) => {
    stories.add(kind, story, fn);
    return api;
  };
  return api;
}
