import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

//BORRAR EVENTO
async function deleteMyEvent(eventId) {
  const token = Cookies.get("token");
  const res = await axios.delete(`${config.apiEvents}/${eventId}`, {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  return res;
}

export { deleteMyEvent };
