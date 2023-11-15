import axios from "axios";
import config from "../../config.json";

async function createUser(data) {
  axios
    .post(config.apiUsers, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (res) {
      return res.data.value;
    })
    .catch(function (error) {
      throw error;
    });
}

export { createUser };
