export function isChimeInitialized(state) {
  return state.isChimeInitialized;
}

export function meetingResponse(state) {
  return state.meetingResponse;
}
export function attendeeResponse(state) {
  return state.attendeeResponse;
}
export function attendeeId(state) {
  if (!state.attendeeResponse) return null;
  return state.attendeeResponse.Attendee.AttendeeId;
}

export function loading(state) {
  return state.loading;
}
