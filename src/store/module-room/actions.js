import { socket } from "boot/socketio";

export function create({}, payload) {
  try {
    socket.emit("JOIN_ROOM", payload);
  } catch (error) {
    return false;
  }
}

export function patch({}, payload) {
  try {
    socket.emit("LEAVE_ROOM", payload);
  } catch (error) {
    return false;
  }
}
