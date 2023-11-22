import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";
const token = Cookies.get("token");

//TRAER TODOS LOS EVENTOS CREADO POR EL USUARIO
async function getMyEvents(userId) {
  const res = await axios.get(`${config.apiEvents}/userEvents/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  return res;
}

export { getMyEvents };
