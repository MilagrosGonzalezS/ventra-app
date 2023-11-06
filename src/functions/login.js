async function login(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(
      "https://ventra-api-e311.onrender.com/auth",
      options
    );
    if (!response.ok) {
      throw new Error("Error al obtener los eventos");
    }
    const res = await response.json();
    console.log("res function", res.user._id);
    localStorage.setItem("userId", res.user._id);
    localStorage.setItem("token", res.jwToken);
    return res;
  } catch (error) {
    console.error(error.message);
  }
}

export default login;
