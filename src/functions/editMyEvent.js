import axios from "axios";
import config from "../config.json";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

//EIDTAR UN EVENTO
export async function editMyEvent(data, eventId) {
  axios
    .put(
      `${config.apiEvents}/${eventId}`,
      {
        name: data.name,
        description: data.description,
        price: data.price,
        zone: data.zone,
        date: data.date,
        time: data.time,
        category: data.category,
        venue: data.venue,
        visibility: data.visibility,
        ticketCount: data.ticketCount,
        /* image: data.image, */
        /*         isFree: false, */
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
      return res.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export default editMyEvent;
