import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

//BORRAR TICKET DE LA LISTA DE REVENTA
async function deleteTicket(ticketId) {
  const token = Cookies.get("token");
  const res = await axios.delete(`${config.apiTickets}/${ticketId}`, {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  return res;
}

export { deleteTicket };
