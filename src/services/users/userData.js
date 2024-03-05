import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

async function userData() {
  const token = Cookies.get("token");
  const id = Cookies.get("userId");
  let username;
  let email;
  let nameOwner;
  let cuitCuil;
  let cbuCvu;
  let bank;
  let completeData;

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
        nameOwner = data[0].nameOwner;
        cuitCuil = data[0].cuitCuil;
        cbuCvu = data[0].cbuCvu;
        bank = data[0].bank;
        completeData = data[0].completeData;
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
    nameOwner: nameOwner,
    cuitCuil: cuitCuil,
    cbuCvu: cbuCvu,
    bank: bank,
    completeData: completeData,
  };

  return user;
}

export { userData };
