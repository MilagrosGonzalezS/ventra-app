import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import deleteMyEvent from "../../functions/deleteMyEvent.js";
// import getEventToEdit from "../../functions/getEventToEdit.js";
import fetchMyEvents from "../../functions/getMyEvents.js";

function MyEvents() {
  const userId = localStorage.getItem("userId");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Función para eliminar un evento
  const handleDeleteEvent = (eventId) => {
    deleteMyEvent(eventId, fetchEvents);
    setConfirmDelete(false);
  };

  //   const handleEditEvent = (eventId) => {
  //     getEventToEdit(eventId, fetchEvents);
  //   };

  const showConfirmation = () => {
    setConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  const fetchEvents = () => {
    setIsLoading(true);
    fetchMyEvents(userId)
      .then((eventsData) => {
        setEvents(eventsData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []); // Asegúrate de pasar un array vacío como segundo argumento para evitar múltiples llamadas

  return (
    <>
      <section className="flex-col items-center">
        <h1 className="font-accent text-2xl text-center">Mis Eventos</h1>
        <h2 className="font-accent text-xl text-center">
          Acá podés encontrar la lista de todos los eventos que creaste
        </h2>
        {isLoading && (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        )}
        <div className="flex flex-col items-center gap-16 flex-wrap mt-16">
          {events.map((event) => (
            <article
              key={event._id}
              className="w-2/5 bg-opacity rounded-xl border p-8"
            >
              <p>{event.name}</p>
              <p>{event.description}</p>
              <div className=" flex justify-between">
                <p className="bg-orange px-2 rounded-md">$ {event.price}</p>
                <p className="bg-orange px-2 rounded-md">{event.category}</p>
              </div>
              <div className="flex gap-4">
                <button className="bg-pink mt-4 px-2 rounded-md">
                  <Link to={`/mis-eventos/${event._id}/editar`}>
                    Editar Evento
                  </Link>
                </button>

                <button
                  onClick={showConfirmation} // Llama a la función dentro del evento de clic
                  className="bg-red-600 mt-4 px-2 rounded-md"
                >
                  Eliminar Evento
                </button>
                {confirmDelete && (
                  <div className="bg-dark rounded-lg p-8 fixed bottom-1/2 right-1/3 m-4 border">
                    <p className="my-2">
                      ¿Estás seguro de eliminar este evento?
                    </p>
                    <button
                      className="mx-2 bg-green py-2 px-4 rounded-xl text-dark"
                      onClick={() => handleDeleteEvent(event._id)}
                    >
                      Sí, eliminar
                    </button>
                    <button
                      className="mx-2 bg-pink py-2 px-4 rounded-xl text-dark"
                      onClick={handleCancelDelete}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default MyEvents;
