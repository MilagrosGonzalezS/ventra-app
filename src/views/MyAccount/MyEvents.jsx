import React, { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import deleteMyEvent from "../../functions/deleteEvent.js";
import fetchMyEvents from "../../functions/getMyEvents.js";

function MyEvents() {
  const userId = localStorage.getItem("userId");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para eliminar un evento
  const handleDeleteEvent = (eventId) => {
    deleteMyEvent(eventId, fetchEvents);
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
        <h1 className="font-accent text-2xl">Mis Eventos</h1>
        <h2 className="font-accent text-xl">
          Acá podés encontrar la lista de todos los eventos que creaste
        </h2>
        <h2>Eventos ♫</h2>
        {isLoading && <PuffLoader color="#04b290" />}
        <div className="flex flex-col items-center gap-16 flex-wrap ">
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
              <button
                onClick={() => handleDeleteEvent(event._id)} // Llama a la función dentro del evento de clic
                className="bg-red-600 mt-4 px-2 rounded-md"
              >
                Eliminar Evento
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default MyEvents;
