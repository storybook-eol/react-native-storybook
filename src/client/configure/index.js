import StoryStore from './store';

export const stories = new StoryStore();

//
export function configure(loaders) {
  loaders();
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
