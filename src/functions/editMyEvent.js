async function editMyEvent(data, eventId) {
  const formattedDate = data.date;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  try {
    const response = await fetch(
      `https://ventra-api-e311.onrender.com/events/${eventId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          price: data.price,
          date: formattedDate,
          category: data.category,
          venue: data.venue,
          state: "Publicado",
          status: true,
          userId: userId,
        }),
      }
    );

    if (response.ok) {
      console.log("Evento modificado exitosamente");
      const updatedEvent = await response.json();
      return updatedEvent;
    } else {
      console.log("Error al modificar el evento");
      throw new Error("Error al modificar el evento");
    }
  } catch (error) {
    console.error(error);
    console.log("Error al conectarse a la API");
    throw error;
  }
}

export default editMyEvent;
