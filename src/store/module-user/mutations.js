export function set(state, payload) {
  state.loading = false;
  Object.assign(state, payload);
}
export function loading(state, payload) {
  state.loading = payload;
}
