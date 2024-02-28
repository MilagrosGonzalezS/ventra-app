import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");

async function getResellList(data) {
  const res = await axios.get(`${config.apiResell}/${data}`, {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  return res;
}

export { getResellList };
