// async function getEventToEdit(eventId) {
//   try {
//     const response = await fetch(
//       `https://ventra-api-e311.onrender.com/events/${eventId}`
//     );
//     if (!response.ok) {
//       throw new Error("Error al obtener los eventos");
//     }
//     const eventsData = await response.json();
//     return eventsData;
//   } catch (error) {
//     console.error(error);
//     throw error; // Lanza el error para manejarlo en el componente MyEvents
//   }
// }

// export default getEventToEdit;

import axios from "axios";
import config from "../config.json";

//TRAER TODOS LOS EVENTOS
async function getEventToEdit(eventId) {
  const res = await axios.get(`${config.apiEvents}/${eventId}`);
  return res;
}

export default getEventToEdit;
