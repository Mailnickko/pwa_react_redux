export default (storageName) => store => next => action => {

  const prev = store.getState().search.posts;
  const result = next(action);
  const state = store.getState().search.posts;
  if (state !== prev) {
    localStorage.setItem(storageName, JSON.stringify(state));
  }
  return;
};
