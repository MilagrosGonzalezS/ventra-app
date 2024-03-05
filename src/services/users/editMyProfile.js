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
    )
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export { editMyProfile };
