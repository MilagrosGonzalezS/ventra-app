async function editMyEvent(data, fetchMyEvents) {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  fetch(`https://ventra-api-e311.onrender.com/events/${data._id}`, {
    method: "PUT",
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
  })
    .then(async (response) => {
      if (response.ok) {
        console.log("Evento modificado exitosamente");
        await fetchMyEvents();
      } else {
        console.log("Error al modificar el evento");
      }
    })
    .catch((error) => {
      console.error(error);
      console.log("Error al conectarse a la API");
    });
}

export default editMyEvent;
