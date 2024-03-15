import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const userId = Cookies.get("userId");

//TRAER TODAS LAS TASK CREADAS POR EL USUARIO EN ESE EVENTO
async function getEventTodo(eventId) {
  const res = await axios.get(`${config.apiTodoList}/${eventId}/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  return res;
}

export { getEventTodo };
