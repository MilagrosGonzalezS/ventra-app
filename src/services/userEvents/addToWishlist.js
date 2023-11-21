import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const userId = Cookies.get("userId");

//CREAR EVENTO
async function addToWishlist(data) {
  axios
    .post(
      config.apiWishlist,
      {
        ...data,
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
      console.log(res.data);
      return res.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export { addToWishlist };
