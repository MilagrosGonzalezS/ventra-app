async function userData() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  let username;
  let email;

  if (id) {
    const apiUrl = `https://ventra-api-e311.onrender.com/users/${id}`;
    try {
      const res = await fetch(apiUrl);
      if (res.ok) {
        const data = await res.json();
        username = data[0].username;
        email = data[0].email;
      } else {
        console.error("Error al obtener los datos del usuario: ", res.status);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }

  const user = {
    token: token,
    id: id,
    username: username,
    email: email,
  };

  return user;
}

export default userData;
