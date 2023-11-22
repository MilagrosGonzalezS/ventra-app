import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");

async function updateEventTickets(eventId) {
  axios
    .patch(`${config.apiEvents}/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    })
    .then(async function (res) {
      console.log(res.data);
      return res.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export default updateEventTickets;
