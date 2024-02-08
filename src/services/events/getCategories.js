import axios from "axios";
import config from "../../config.json";

//TRAER TODOS LOS EVENTOS
async function getCategories() {
  const res = await axios.get(config.apiCategories);
  return res.data;
}

export { getCategories };
