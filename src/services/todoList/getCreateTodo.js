import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const userId = Cookies.get("userId");

//CREAR TASK PARA ESE EVENTO
async function getCreateTodo(eventId, task) {
  const res = await axios.post(
    config.apiTodoList,
    {
      eventId: eventId,
      userId: userId,
      task: task,
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

export { getCreateTodo };
