import axios from "axios";
import config from "../config.json";

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

//EIDTAR UN EVENTO
export async function editMyEvent(data, eventId) {
  const formattedDate = data.date;
  axios
    .put(
      `${config.apiEvents}/${eventId}`,
      {
        name: data.name,
        description: data.description,
        price: data.price,
        date: formattedDate,
        category: data.category,
        venue: data.venue,
        state: "Publicado",
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
