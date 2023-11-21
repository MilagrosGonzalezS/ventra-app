import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const userId = Cookies.get("userId");

//TRAER TODOS LOS EVENTOS CREADO POR EL USUARIO
async function getMyWishlist() {
  const res = await axios.get(`${config.apiWishlist}/${userId}`);
  console.log("el get", res);
  return res;
}

export { getMyWishlist };
