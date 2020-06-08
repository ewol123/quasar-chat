import { socket } from "boot/socketio";

export function create({}, payload) {
  try {
    socket.emit("CREATE_USER", payload);
  } catch (error) {
    return false;
  }
}
