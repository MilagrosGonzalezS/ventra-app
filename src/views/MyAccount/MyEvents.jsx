import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { deleteMyEvent, getMyEvents } from "../../index.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Button } from "@nextui-org/react";
function MyEvents() {
  const { user } = useContext(AuthContext);
  const userId = user.id;
  const navigation = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleDeleteEvent = (eventId) => {
    setEventToDelete(eventId); // Almacenar el ID del evento a eliminar
    setIsDeleteModalOpen(true); // Abrir el modal de confirmación
  };

  const getEvents = () => {
    setIsLoading(true);
    getMyEvents(userId)
      .then((eventsData) => {
        setEvents(eventsData.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <section className="min-h-screen flex-col items-center bg-pattern px-20 pt-12">
        <h1 className="font-accent text-3xl text-orange mb-8">Mis Eventos</h1>
        {isLoading ? (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        ) : (
          <div className="flex gap-16 justify-start flex-wrap mt-4">
            {events.length === 0 ? (
              <p className="font-accent text-center">
                Aún no has creado ningún evento.
              </p>
            ) : (
              events.map((event) => (
                <article key={event._id}>
                  <div className="flex justify-between items-center mb-4">
                    <strong className="text-xl ">{event.name}</strong>
                    <div className="flex gap-2">
                      <p className="bg-green text-dark px-2 rounded-md">
                        {event.date ? event.date.slice(0, 10) : ""}
                      </p>
                      <p className="bg-green text-dark px-2 rounded-md">
                        {event.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <p className="bg-pink px-2 rounded-md">{event.venue}</p>
                    <p className="bg-gray-500 px-2 rounded-md">{event.zone}</p>
                  </div>
                  <p>{event.description}</p>
                  <div className=" flex justify-between mb-4">
                    <p className="bg-green text-dark px-2 rounded-md">
                      $ {event.price}
                    </p>
                    <div className="flex gap-2">
                      <p className="bg-orange px-2 rounded-md">
                        {event.category}
                      </p>
                      <p className="bg-gray-500 px-2 rounded-md">
                        {event.visibility === "public" ? "Público" : "Privado"}
                      </p>
                    </div>
                  </div>
                  <Button
                    color="default"
                    onPress={() => {
                      navigation(`/detalle/${event._id}`);
                    }}
                    variant="faded"
                  >
                    Ver evento
                  </Button>
                  <div className="flex gap-4">
                    <button className="bg-lightblue mt-4 px-2 rounded-md">
                      <Link to={`/mis-eventos/${event._id}/editar`}>
                        Editar Evento
                      </Link>
                    </button>

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
          <div className="bg-dark rounded-lg p-8 fixed bottom-1/2 right-1/3 m-4 border">
            <p className="text-light text-lg">
              ¿Estás seguro de que deseas eliminar este evento?
            </p>
            <div className="mt-4 flex justify-center gap-16">
              <button
                onClick={() => {
                  deleteMyEvent(eventToDelete).then(() => {
                    getEvents();
                  });

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
                className="bg-green text-dark px-4 py-2 rounded-md"
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

export { MyEvents };
