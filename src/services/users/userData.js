import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

async function userData() {
  const token = Cookies.get("token");
  const id = Cookies.get("userId");
  let username;
  let email;

  if (id) {
    try {
      const res = await axios.get(`${config.apiUsers}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      });

      // Verifica el estado de la respuesta
      if (res.status === 200) {
        const data = res.data;
        username = data[0].username;
        email = data[0].email;
      } else {
        console.error("Error al obtener los datos del usuario:", res.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const user = {
    token: token,
    id: id,
    username: username,
    email: email,
  };

  return user;
}

export { userData };
