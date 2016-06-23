import UUID from 'uuid';
import { EventEmitter } from 'events';

export default class ActionStore extends EventEmitter {
  constructor(...args) {
    super(...args);
  }

  newAction(name) {
    return (..._args) => {
      let args = Array.from(_args);

      args = args.map(arg => {
        if (arg && typeof arg.preventDefault === 'function') {
          return '[SyntheticEvent]';
        }
        return arg;
      });

      const id = UUID.v4();
      const data = { name, args };
      const action = { data, id };

      this.emit('action', action);
    };
  }
}
