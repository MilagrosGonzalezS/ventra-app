import axios from "axios";
import config from "../config.json";

//TRAER TODOS LOS EVENTOS
async function getMyEvents(userId) {
  const res = await axios.get(`${config.apiEvents}/userEvents/${userId}`);
  return res;
}

// async function fetchMyEvents(userId) {
//   try {
//     const response = await fetch(
//       `https://ventra-api-e311.onrender.com/events/userEvents/${userId}`
//     );
//     if (!response.ok) {
//       throw new Error("Error al obtener los eventos");
//     }
//     const eventsData = await response.json();
//     return eventsData;
//   } catch (error) {
//     console.error("no hay eventos", error);
//     throw error; // Lanza el error para manejarlo en el componente MyEvents
//   }
// }

export default getMyEvents;
