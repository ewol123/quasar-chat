import { Notify, Loading } from "quasar";

export function loading(state, payload) {
  state.loading = payload;
}

export function chimeMeetingCreated(state, payload) {
  Loading.hide();
  state.loading = false;
  if (!payload || payload.error) {
    return Notify.create({
      message: "Oops, an error occured, please try again",
      color: "warning"
    });
  }
  Object.assign(state, { ...payload, isChimeInitialized: true });
}
export function joinedChimeMeeting(state, payload) {
  Loading.hide();
  state.loading = false;
  if (!payload || payload.error) {
    return Notify.create({
      message: "Oops, an error occured, please try again",
      color: "warning"
    });
  }
  Object.assign(state, { ...payload, isChimeInitialized: true });
}

export function leaveChimeMeeting(state) {
  state.isChimeInitialized = false;
  state.meetingResponse = null;
  state.attendeeResponse = null;
}
