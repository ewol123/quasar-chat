import { connection } from "boot/signalr";

export async function create({}, payload) {
  try {
    await connection.invoke("CreateMessage", payload);
  } catch (error) {
    return false;
  }
}
