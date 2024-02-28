import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const userId = Cookies.get("userId");

async function completeCreatorData(data) {
  try {
    const response = await axios.put(
      `${config.apiUsers}/complete-creator-data/${userId}`,
      {
        nameOwner: data.nameOwner,
        cuitCuil: data.cuitCuil,
        bank: data.bank,
        cbuCvu: data.cbuCvu,
      },
      {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      }
    );
    console.log("resjs", response.data.value); // Log aquí si es necesario
    return response.data.value;
  } catch (error) {
    console.log("error back", error.response.data.error);
    return { error: error.response.data.error };
  }
}

export { completeCreatorData };
