async function createUser(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(
      "https://ventra-api-e311.onrender.com/users",
      options
    );
    if (!response.ok) {
      throw new Error("Error al obtener los eventos");
    }
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error(error.message);
  }
  return data;
}

export default createUser;
