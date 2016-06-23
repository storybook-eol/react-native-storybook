import StoryStore from './store';
import ClientApi from './client';

export const stories = new StoryStore();
export const client = new ClientApi(stories);

export const addDecorator = client.addDecorator.bind(client);
export const setAddon = client.setAddon.bind(client);
export const configure = client.configure.bind(client);
export const storiesOf = client.storiesOf.bind(client);
