async function createEvent(data) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const response = await fetch("https://ventra-api-e311.onrender.com/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
    body: JSON.stringify({
      name: data.name,
      description: data.description,
      price: data.price,
      date: data.date,
      category: data.category,
      venue: data.venue,
      state: "Publicado",
      status: true,
      userId: userId,
    }),
  });

  if (response.ok) {
    const newEvent = await response.json();
    console.log("Evento creado exitosamente");
    return newEvent;
  } else {
    console.log("Error al crear el evento");
    throw new Error("Error al crear el evento");
  }
}

export default createEvent;
