import axios from "axios";
import config from "../../config.json";

//TRAER TODOS LOS EVENTOS
async function getEvents() {
  const res = await axios.get(config.apiEvents);
  return res;
}

export { getEvents };
