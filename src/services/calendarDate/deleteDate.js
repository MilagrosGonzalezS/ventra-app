import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

//BORRAR DATE DEL CALENDAR
async function deleteDate(taskId) {
  const token = Cookies.get("token");
  const res = await axios.delete(`${config.apiCalendarDate}/${taskId}`, {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  return res;
}

export { deleteDate };
