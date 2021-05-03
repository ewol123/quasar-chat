import { connection } from "boot/signalr";

export async function create({ commit }, payload) {
  try {
    await connection.invoke("CreateUser", payload);
  } catch (error) {
    commit("loading", false);
    return false;
  }
}
