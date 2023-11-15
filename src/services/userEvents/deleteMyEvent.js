import axios from "axios";
import config from "../../config.json";

//BORRAR EVENTO
async function deleteMyEvent(eventId) {
  const res = await axios.delete(`${config.apiEvents}/${eventId}`);
  return res;
}

export { deleteMyEvent };
