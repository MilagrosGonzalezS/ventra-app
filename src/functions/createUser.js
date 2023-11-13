import axios from "axios";
import config from "../config.json";

async function createUser(data) {
  axios
    .post(config.apiUsers, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (res) {
      // console.log("retorno", res.data.value);
      return res.data.value;
    })
    .catch(function (error) {
      throw error;
    });
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   };

  //   try {
  //     const response = await fetch(
  //       "https://ventra-api-e311.onrender.com/users",
  //       options
  //     );
  //     if (!response.ok) {
  //       throw new Error("Error al registrar al usuario");
  //     }
  //     const res = await response.json();
  //     console.log(res);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  //   return data;
}

export default createUser;
