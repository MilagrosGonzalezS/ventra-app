import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

async function editMyProfile(data, userId) {
  const token = Cookies.get("token");

  axios
    .put(
      `${config.apiUsers}/update-user/${userId}`,
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
      }
    )
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export { editMyProfile };
