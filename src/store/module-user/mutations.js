import { Notify } from "quasar";

export function loading(state, payload) {
  state.loading = payload;
}

export function userCreated(state, payload) {
  state.loading = false;
  if (!payload || payload.error) {
    return Notify.create({
      message: "Oops, an error occured, please try again",
      color: "warning"
    });
  }
  Object.assign(state, payload);
}
