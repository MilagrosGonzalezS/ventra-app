import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");

async function transferTicket(ticketId, userId) {
  axios
    .patch(
      `${config.apiTickets}/transfer/${ticketId}`,
      {
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      }
    )
    .then(function (res) {
      console.log("res.data", res.data);
      return res.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export { transferTicket };
