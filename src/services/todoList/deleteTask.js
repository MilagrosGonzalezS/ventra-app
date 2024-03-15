import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

//BORRAR TICKET DE LA LISTA DE REVENTA
async function deleteTask(taskId) {
  const token = Cookies.get("token");
  const res = await axios.delete(`${config.apiTodoList}/${taskId}`, {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  return res;
}

export { deleteTask };
