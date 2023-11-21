import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const userId = Cookies.get("userId");

//CREAR EVENTO
async function createEvent(data) {
  axios
    .post(
      config.apiEvents,
      {
        ...data,
        status: true,
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export { createEvent };
