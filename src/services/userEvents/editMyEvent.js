import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const userId = Cookies.get("userId");

//EIDTAR UN EVENTO
async function editMyEvent(data, eventId) {
  console.log("Data function", data);
  axios
    .patch(
      `${config.apiEvents}/${eventId}`,
      {
        ...data,
        address: {
          street: data.street,
          number: data.number,
        },
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
      console.log("res.data", res.data);
      return res.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export { editMyEvent };
