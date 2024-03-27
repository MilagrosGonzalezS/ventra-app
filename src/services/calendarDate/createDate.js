import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const userId = Cookies.get("userId");

//CREAR TASK PARA ESE EVENTO
async function createDate(
  eventId,
  title,
  description,
  color,
  startDate,
  endDate
) {
  try {
    const res = await axios.post(
      config.apiCalendarDate,
      {
        eventId: eventId,
        userId: userId,
        title: title,
        description: description,
        color: color,
        startDate: startDate,
        endDate: endDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error al crear el evento:", error);
    throw error; // Re-lanza el error para que el llamador también pueda manejarlo si es necesario
  }
}

export { createDate };
