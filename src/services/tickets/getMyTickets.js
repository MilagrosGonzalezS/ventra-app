import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const userId = Cookies.get("userId");
const token = Cookies.get("token");

async function getMyTickets() {
  const res = await axios.get(`${config.apiTickets}/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  return res;
}

export { getMyTickets };
