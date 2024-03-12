import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const userId = Cookies.get("userId");

async function findByEmail(email) {
  const res = await axios.get(`${config.apiUsers}/email/${email}`, {
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
  });
  let user = res.data[0];
  if (user._id == userId) {
    return;
  } else {
    return res.data[0];
  }
}

export { findByEmail };
