import axios from "axios";
import config from "../../config.json";

//TRAER TODOS LOS EVENTOS CREADO POR EL USUARIO
async function getMyEvents(userId) {
  const res = await axios.get(`${config.apiEvents}/userEvents/${userId}`);
  return res;
}

export { getMyEvents };
