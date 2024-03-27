import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const userId = Cookies.get("userId");

//TRAER TODOS LOS DATES AGENDADOD POR EL USUARIO EN ESE EVENTO
async function getDate(eventId) {
  const res = await axios.get(
    `${config.apiCalendarDate}/${eventId}/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    }
  );
  return res;
}

export { getDate };
