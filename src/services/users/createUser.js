import axios from "axios";
import config from "../../config.json";

async function createUser(data) {
  try {
    const response = await axios.post(config.apiUsers, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("resjs", response.data.value); // Log aquí si es necesario
    return response.data.value;
  } catch (error) {
    console.log("error back", error.response.data.error);
    return { error: error };
  }
}

export { createUser };
