import { Notify } from "quasar";

export function loading(state, payload) {
  state.loading = payload;
}

export function joinedRoom(state, payload) {
  state.loading = false;
  if (payload.error) {
    Notify.create({
      message: "Oops, an error occured, please try again",
      color: "warning"
    });
  } else {
    Object.assign(state, { ...payload, isInitialized: true });
  }
}

export function brJoinedRoom(state, payload) {
  state.loading = false;
  if (payload.error) {
    Notify.create({
      message: "Oops, an error occured, please try again",
      color: "warning"
    });
  } else {
    Object.assign(state, { users: payload.users });
  }
}

export function leftRoom(state, payload) {
  state.loading = false;
  if (!payload || payload.error) {
    return Notify.create({
      message: "Oops, an error occured, please try again",
      color: "warning"
    });
  }
  Object.assign(state, {
    roomIdentifier: null,
    users: [],
    messages: [],
    isInitialized: false
  });
}

export function brLeftRoom(state, payload) {
  state.loading = false;
  if (!payload || payload.error) {
    return Notify.create({
      message: "Oops, an error occured, please try again",
      color: "warning"
    });
  }
  Object.assign(state, { users: payload.users });
}

export function messageCreated(state, payload) {
  state.loading = false;
  if (!payload || payload.error) {
    return Notify.create({
      message: "Oops, an error occured, please try again",
      color: "warning"
    });
  }
  state.messages.push(payload.message);
}

export function brMessageCreated(state, payload) {
  state.loading = false;
  if (!payload || payload.error) {
    return Notify.create({
      message: "Oops, an error occured, please try again",
      color: "warning"
    });
  }
  state.messages.push(payload.message);
}
