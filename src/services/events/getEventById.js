import axios from "axios";
import config from "../../config.json";

//TRAER TODOS LOS EVENTOS
async function getEventById(eventId) {
  const res = await axios.get(`${config.apiEvents}/${eventId}`);
  return res;
}

export { getEventById };
