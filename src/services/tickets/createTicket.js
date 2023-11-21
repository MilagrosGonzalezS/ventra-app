import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const userId = Cookies.get("userId");

//CREAR EVENTO
async function createTicket(data) {
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
    .then(function (res) {
      console.log(res.data);
      return res.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export { createTicket };
