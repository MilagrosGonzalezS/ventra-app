import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

//EDITAR TASK DE LA LISTA
async function editTask(taskId, task) {
  const token = Cookies.get("token");
  const res = await axios.patch(`${config.apiTodoList}/edit/${taskId}`, {
    task: task,
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  return res;
}

export { editTask };
