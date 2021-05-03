import * as signalR from "@microsoft/signalr";
import EVENT_TYPES from "../events/index";

const connection = new signalR.HubConnectionBuilder()
  .withUrl(process.env.SOCKET_SERVER)
  .configureLogging(signalR.LogLevel.Information)
  .build();

async function start() {
  try {
    await connection.start();
    console.log("SignalR Connected.");
  } catch (err) {
    console.log(err);
    setTimeout(start, 5000);
  }
}

export default ({ app, router, store, Vue }) => {
  start();
  connection.onclose(start);
  for (let TYPE in EVENT_TYPES) {
    connection.on(TYPE, payload => {
      store.commit(EVENT_TYPES[TYPE], payload);
    });
  }

  Vue.prototype.$connection = connection;
};

export { connection };
