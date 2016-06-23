import ActionStore from './action_store';
import StoryStore from './story_store';
import ClientApi from './client';

export const actions = new ActionStore();
export const stories = new StoryStore();
export const client = new ClientApi(actions, stories);

export const action = client.action.bind(client);
export const addDecorator = client.addDecorator.bind(client);
export const setAddon = client.setAddon.bind(client);
export const configure = client.configure.bind(client);
export const storiesOf = client.storiesOf.bind(client);
