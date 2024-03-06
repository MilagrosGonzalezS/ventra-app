import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const userId = Cookies.get("userId");

//CAMBIAR APPROVE DEL EVENTO
async function editApprovement(eventId, approve) {
  console.log("Data function", approve);
  try {
    const response = await axios.patch(
      `${config.apiEvents}/approvement/${eventId}`,
      { approve },
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

export { editApprovement };
