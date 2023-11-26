import axios from "axios";
import config from "../../config.json";

//TRAER TODOS LOS EVENTOS
async function getAllEvents() {
  const res = await axios.get(config.apiEvents);
  return res;
}

export { getAllEvents };

async function getEvents(page) {
  const res = await axios.get(`${config.apiEvents}?page=${page}&amount=6`);
  return res;
}

export { getEvents };
