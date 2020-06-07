import { socket } from 'boot/socketio'

export function create({}, payload) {
  try {
    socket.emit("JOIN_ROOM",payload);
  } catch (error) {
    return false;
  }
}