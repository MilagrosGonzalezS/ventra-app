import axios from "axios";
import config from "../config.json";

//TRAER TODOS LOS EVENTOS
export async function getEvents() {
  const res = await axios.get(config.apiEvents);
  return res;
}
