import axios from "axios";
import config from "../config.json";

async function login(data) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(config.apiAuth, data, options);

    // Verifica el estado de la respuesta
    if (response.status === 200) {
      const res = response.data;
      localStorage.setItem("userId", res.user._id);
      localStorage.setItem("token", res.jwToken);
      return res;
    } else {
      // En caso de error, construye un objeto JSON con el mensaje de error
      return {
        error: "El email y/o contraseña no coinciden con un usuario registrado",
      };
    }
  } catch (error) {
    console.error("Error al loguearse:", error.message);
    return { error: "Error al loguearse" };
  }
}

export default login;

// async function login(data) {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };

//   try {
//     const response = await fetch(
//       "https://ventra-api-e311.onrender.com/auth",
//       options
//     );
//     if (!response.ok) {
//       // En caso de error, construye un objeto JSON con el mensaje de error
//       return {
//         error: "El email y/o contraseña no coinciden con un usuario registrado",
//       };
//     }
//     const res = await response.json();
//     localStorage.setItem("userId", res.user._id);
//     localStorage.setItem("token", res.jwToken);
//     return res;
//   } catch (error) {
//     console.error(error.message);
//     return { error: "Error al loguearse" };
//   }
// }

// export default login;
