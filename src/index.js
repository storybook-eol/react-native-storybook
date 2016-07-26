import Preview from './preview';
const preview = new Preview();

export function action(name) {
  return preview.newAction(name);
}

export function linkTo(kind, story) {
  return preview.newLink(kind, story);
}

export function addDecorator(decorator) {
  return preview.addDecorator(decorator);
}

export function setAddon(addon) {
  return preview.setAddon(addon);
}

export function configure(loadStories, module) {
  loadStories();
  if (module.hot) {
    module.hot.accept(() => preview.sendSetStories());
    // TODO remove all global decorators on dispose
  }
}

export function storiesOf(kind, module) {
  if (module.hot) {
    // TODO remove the kind on dispose
  }
  return preview.newKind(kind);
}

// export API to override user configurations
// useful when building using CI servers.
// This will also freeze configurations.
export function configureUI(config) {
  // NOTE: for backward compatibility
  if (config.host || config.port) {
    config.host = config.host || 'localhost';
    config.port = config.port || 9001;
    preview.configure({
      channel: {
        type: 'websocket',
        options: {
          url: `ws://${config.host}:${config.port}`,
        },
      },
    });
    delete config.host;
    delete config.port;
  }
  preview.configure(config);
  preview.freezeConfig();
  preview.startChannel();
}

// returns a (stateless) react component for the UI
export function getStorybookUI(customConfig = {}) {
  configureUI(customConfig);
  return () => preview.renderPreview();
}

// NOTE: for backward compatibility
export const PreviewComponent = getStorybookUI;
export const StorybookUI = getStorybookUI;
