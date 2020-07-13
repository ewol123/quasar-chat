import { socket } from "boot/socketio";

export function create({ commit }, payload) {
  try {
    socket.emit("JOIN_ROOM", payload);
  } catch (error) {
    commit("loading", false);
    return false;
  }
}

export function patch({ commit }, payload) {
  try {
    socket.emit("LEAVE_ROOM", payload);
  } catch (error) {
    commit("loading", false);
    return false;
  }
}
