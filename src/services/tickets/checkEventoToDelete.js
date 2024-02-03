import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

//VERIFICAR EVENTO A ELIMINAR
async function checkEventoToDelete(eventId) {
  const token = Cookies.get("token");
  const res = await axios.get(
    `${config.apiTickets}/checkEventToDelete/${eventId}`,
    {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    }
  );
  return res.data.hasTickets;
}

export { checkEventoToDelete };
