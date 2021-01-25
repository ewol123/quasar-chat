import { socket } from "boot/socketio";
import { Loading } from "quasar";

export function createChimeMeeting({}, payload) {
  try {
    Loading.show();
    socket.emit("CREATE_CHIME_MEETING", payload);
  } catch (error) {
    return false;
  }
}

export function joinChimeMeeting({}, payload) {
  try {
    Loading.show();
    socket.emit("JOIN_CHIME_MEETING", payload);
  } catch (error) {
    return false;
  }
}
