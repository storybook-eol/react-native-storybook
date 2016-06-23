export default class ClientApi {
  constructor(stories) {
    this._stories = stories;
    this._addons = {};
  }

  setAddon(addon) {
    Object.assign(this._addons, addon);
  }

  configure(loaders, module) {
    loaders();
    if (module.hot) {
      module.hot.accept(() => this._stories.emit('change'));
    }
  }

  storiesOf(kind) {
    return new KindApi(this._stories, this._addons, kind);
  }
}

export class KindApi {
  constructor(stories, addons, kind) {
    this.kind = kind;
    this._stories = stories;
    Object.assign(this, addons);
  }

  add(story, fn) {
    this._stories.add(this.kind, story, fn);
    return this;
  }
}
