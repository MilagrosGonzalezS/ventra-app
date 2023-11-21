import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const userId = Cookies.get("userId");

async function getMyTickets() {
  const res = await axios.get(`${config.apiTickets}/${userId}`);
  return res;
}

export { getMyTickets };
