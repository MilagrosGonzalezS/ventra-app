import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

//BORRAR TICKET DE LA LISTA DE REVENTA
async function deleteFromResell(resellId) {
  const token = Cookies.get("token");
  const res = await axios.delete(`${config.apiResell}/${resellId}`, {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  return res;
}

export { deleteFromResell };
