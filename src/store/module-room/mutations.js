export function set(state, payload) {
  Object.keys(payload).forEach(key => {
    if (!state[key] || !Array.isArray(state[key]))
      Object.assign(state, { [key]: payload[key] });
    else {
      if (Array.isArray(payload[key]))
        Object.assign(state, { [key]: payload[key] });
      else Object.assign(state, { [key]: [...state[key], payload[key]] });
    }
  });
  state.loading = false;
}

export function loading(state, payload) {
  state.loading = payload;
}
