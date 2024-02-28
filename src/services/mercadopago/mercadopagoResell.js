import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");

async function createPreferenceResell(data) {
  console.log(data);
  try {
    const res = await axios.post(
      config.apiMPResell,
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

export { createPreferenceResell };
