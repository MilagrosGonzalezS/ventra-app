import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");

async function updateEventTickets(eventId) {
  try {
    const res = await axios.patch(
      `${config.apiEvents}/updateTickets/${eventId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      }
    );

    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default updateEventTickets;
