import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");

async function createResellTicket(data) {
  console.log(data);
  const res = await axios.post(
    config.apiResell,
    {
      ...data,
      status: true,
    },
    {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    }
  );
  return res;
}

export { createResellTicket };
