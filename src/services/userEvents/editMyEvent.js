import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const userId = Cookies.get("userId");

//EIDTAR UN EVENTO
async function editMyEvent(data, eventId) {
  axios
    .put(
      `${config.apiEvents}/${eventId}`,
      {
        ...data,
        /* image: data.image, */
        /*         isFree: false, */
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

export { editMyEvent };
