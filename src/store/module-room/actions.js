import { connection } from "boot/signalr";

export async function create({ commit }, payload) {
  try {
    await connection.invoke("JoinRoom", payload);
  } catch (error) {
    commit("loading", false);
    return false;
  }
}

export async function patch({ commit }, payload) {
  try {
    await connection.invoke("LeaveRoom", payload);
  } catch (error) {
    commit("loading", false);
    return false;
  }
}
