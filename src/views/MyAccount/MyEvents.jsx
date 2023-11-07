import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import deleteMyEvent from "../../functions/deleteMyEvent.js";
import fetchMyEvents from "../../functions/getMyEvents.js";

function MyEvents() {
  const userId = localStorage.getItem("userId");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleDeleteEvent = (eventId) => {
    deleteMyEvent(eventId, fetchEvents);
  };

  //   const handleEditEvent = (eventId) => {
  //     getEventToEdit(eventId, fetchEvents);
  //   };

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
  }, []);

  return (
    <>
      <section className="flex-col items-center">
        <h1 className="font-accent text-2xl text-center">Mis Eventos</h1>
        <h2 className="font-accent text-xl text-center">
          Acá podés encontrar la lista de todos los eventos que creaste
        </h2>
        {isLoading ? (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        ) : (
          <div className="flex flex-col items-center gap-16 flex-wrap mt-16">
            {events.length === 0 ? (
              <p className="font-accent text-center">
                Aún no has creado ningún evento.
              </p>
            ) : (
              events.map((event) => (
                <article
                  key={event._id}
                  className="w-2/5 bg-opacity rounded-xl border p-8"
                >
                  <strong className="text-xl mb-4">{event.name}</strong>
                  <p>{event.description}</p>
                  <div className=" flex justify-between">
                    <p className="bg-orange px-2 rounded-md">$ {event.price}</p>
                    <p className="bg-orange px-2 rounded-md">
                      {event.category}
                    </p>
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
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="bg-red-600 mt-4 px-2 rounded-md"
                    >
                      Eliminar Evento
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </section>
      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70">
          <div className="bg-dark p-4 rounded-lg text-center">
            <p className="text-light text-lg">
              ¿Estás seguro de que deseas eliminar este evento?
            </p>
            <div className="mt-4">
              <button
                onClick={() => {
                  deleteMyEvent(eventToDelete, fetchEvents);
                  setIsDeleteModalOpen(false); // Cerrar el modal después de eliminar
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md mr-4"
              >
                Eliminar
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false); // Cerrar el modal sin eliminar
                }}
                className="bg-green text-gray-700 px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyEvents;
