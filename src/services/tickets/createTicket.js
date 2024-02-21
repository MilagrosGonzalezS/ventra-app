import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";
import updateEventTickets from "../events/updateEventTickets.js";

const token = Cookies.get("token");
const userId = Cookies.get("userId");

//CREAR EVENTO
async function createTicket(data) {
  console.log(data);
  axios
    .post(
      config.apiTickets,
      {
        ...data,
        status: true,
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      }
    )
    .then(async function (res) {
      await updateEventTickets(data.eventId);
      return res.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export { createTicket };
