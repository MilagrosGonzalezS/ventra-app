import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");

async function getMySoldTickets(eventId) {
  const res = await axios.get(`${config.apiTickets}/soldTickets/${eventId}`, {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  return res.data.length;
}

export { getMySoldTickets };
