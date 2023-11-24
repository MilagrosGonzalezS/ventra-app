import axios from "axios";
import config from "../../config.json";

//TRAER TODOS LOS EVENTOS
async function getEvents(page) {
  const res = await axios.get(`${config.apiEvents}?page=${page}&amount=2`);
  return res;
}

export { getEvents };
