import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const userId = Cookies.get("userId");
const token = Cookies.get("token");

//TRAER TODOS LOS EVENTOS CREADO POR EL USUARIO
async function getMyWishlist() {
  const res = await axios.get(`${config.apiWishlist}/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  console.log(res);
  return res;
}

export { getMyWishlist };
