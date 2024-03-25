import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");

//CAMBIAR EVENTO DESTACADO
async function editFeatured(eventId, featured) {
  console.log("Data function", featured);
  try {
    const response = await axios.patch(
      `${config.apiEvents}/featured/${eventId}`,
      { featured },
      {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      }
    );
    console.log("res.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { editFeatured };
