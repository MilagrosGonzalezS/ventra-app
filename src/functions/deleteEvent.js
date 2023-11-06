function deleteMyEvent(eventId, fetchMyEvents) {
  // Realiza la solicitud de eliminación con el método DELETE
  fetch(`https://ventra-api-e311.onrender.com/events/${eventId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // Eliminación exitosa, llama a la función para actualizar la lista de eventos
        console.log("Evento eliminado");
        fetchMyEvents();
      } else {
        console.log("Error al eliminar el evento");
      }
    })
    .catch((error) => {
      console.error(error);
      console.log("Error al conectarse a la API");
    });
}

export default deleteMyEvent;
