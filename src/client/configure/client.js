export default class ClientApi {
  constructor(actions, stories) {
    this._actions = actions;
    this._stories = stories;
    this._addons = {};
    this._decorators = [];
  }

  action(name) {
    return this._actions.newAction(name);
  }

  addDecorator(decorator) {
    this._decorators.push(decorator);
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
    return new KindApi(this._stories, this._addons, this._decorators, kind);
  }
}

export class KindApi {
  constructor(stories, addons, decorators, kind) {
    this.kind = kind;
    this._stories = stories;
    this._decorators = decorators.slice();
    Object.assign(this, addons);
  }

  addDecorator(decorator) {
    this._decorators.push(decorator);
  }

  add(story, fn) {
    const decorated = this._decorate(fn);
    this._stories.add(this.kind, story, decorated);
    return this;
  }

  _decorate(fn) {
    return this._decorators.reduce((decorated, decorator) => {
      return context => {
        const _fn = () => decorated(context);
        return decorator(_fn, context);
      };
    }, fn);
  }
}
