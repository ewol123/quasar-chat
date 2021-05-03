import { connection } from "boot/signalr";
import { Loading } from "quasar";

export async function createChimeMeeting({}, payload) {
  try {
    Loading.show();
    await connection.invoke("CreateChimeMeeting", payload);
  } catch (error) {
    return false;
  }
}

export async function joinChimeMeeting({}, payload) {
  try {
    Loading.show();
    await connection.invoke("JoinChimeMeeting", payload);
  } catch (error) {
    return false;
  }
}
