import { socket } from "boot/socketio";

export function create({ commit }, payload) {
  try {
    socket.emit("CREATE_USER", payload);
  } catch (error) {
    commit("loading", false);
    return false;
  }
}
