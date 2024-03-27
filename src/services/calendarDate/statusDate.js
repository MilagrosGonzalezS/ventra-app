import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

//MODIFICAR STATUS TASK DE LA LISTA
async function statusTask(taskId) {
  const token = Cookies.get("token");
  const res = await axios.patch(`${config.apiTodoList}/${taskId}`, {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  return res;
}

export { statusTask };
