import axios from "axios";
import config from "../config.json";

//TRAER TODOS LOS EVENTOS
export async function getEvents() {
  const res = await axios.get(config.apiEvents);
  return res;
}

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

//CREAR UN EVENTO
export async function createEvent(data) {
  axios
    .post(
      config.apiEvents,
      {
        name: data.name,
        description: data.description,
        price: data.price,
        date: data.date,
        time: data.time,
        category: data.category,
        venue: data.venue,
        visibility: data.visibility,
        ticketCount: data.ticketCount,
        termsAndConditions: data.termsAndConditions,
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
