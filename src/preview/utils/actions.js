import UUID from 'uuid';

export function create(name, _args) {
  const id = UUID.v4();
  const args = Array.from(_args).map(filterSyntheticEvents);
  return { id, data: { name, args } };
}

function filterSyntheticEvents(arg) {
  if (arg && typeof arg.preventDefault === 'function') {
    return '[SyntheticEvent]';
  }
  return arg;
}
