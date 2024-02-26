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
        address: {
          street: data.street,
          number: data.number,
        },
        status: false,
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
      console.log("evento creado " + res.data);
      return res.data;
    })
    .catch(function (error) {
      console.log("evento no creado ");

      throw error;
    });
}

export { createEvent };
