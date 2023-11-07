async function EditProfile(data, userId) {
  const token = localStorage.getItem("token");
  fetch(`https://ventra-api-e311.onrender.com/users/update-user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
    }),
  })
    .then(async (response) => {
      if (response.ok) {
        console.log("Usuario modificado exitosamente");
      } else {
        console.log("Error al modificar el usuario");
      }
    })
    .catch((error) => {
      console.error(error);
      console.log("Error al conectarse a la API");
    });
}

export default EditProfile;
