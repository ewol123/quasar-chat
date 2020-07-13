import { socket } from "boot/socketio";

export function create({}, payload) {
  try {
    socket.emit("CREATE_MESSAGE", payload);
  } catch (error) {
    return false;
  }
}
