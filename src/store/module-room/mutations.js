export function set(state, payload) {
  state.loading = false;
  Object.keys(payload).forEach(key => {
    if (!state[key] || !Array.isArray(state[key])) Object.assign(state, { [key]: payload[key] })
    else Object.assign(state, { [key]: [...state[key], payload[key]] })
  });
}

export function loading(state, payload) {
  state.loading = payload;
}
