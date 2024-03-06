import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const userId = Cookies.get("userId");

//EIDTAR UN EVENTO
async function updatePublishedTicket(ticketId) {
  axios
    .patch(
      `${config.apiTickets}/${ticketId}`,
      {
        state: "published",
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

export { updatePublishedTicket };
