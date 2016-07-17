export class Store {
  constructor() {
    this.data = {};
  }

  add(kind, story, fn) {
    this.data[kind] = this.data[kind] || {stories: {}};
    this.data[kind].stories[story] = fn;
  }

  get(kind, story) {
    return this.data[kind] && this.data[kind].stories[story];
  }

  dump() {
    const dump = [];
    for (let kind in this.data) {
      if (!this.data.hasOwnProperty(kind)) {
        continue;
      }
      const stories = this.data[kind].stories;
      const kindInfo = {kind, stories: []};
      for (let story in stories) {
        if (!stories.hasOwnProperty(story)) {
          continue;
        }
        kindInfo.stories.push(story);
      }
      dump.push(kindInfo);
    }
    return dump;
  }
}
