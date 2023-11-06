import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PuffLoader } from "react-spinners";
import editMyEvent from "../../functions/editMyEvent.js";
import getEventToEdit from "../../functions/getEventToEdit.js";

function EditMyEvent() {
  const { eventId } = useParams();
  const userId = localStorage.getItem("userId");
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleEditEvent = (eventId) => {
    editMyEvent(eventId, fetchEvents);
  };

  const fetchEvents = () => {
    setIsLoading(true);
    getEventToEdit(eventId)
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
        <h1 className="font-accent text-2xl">Editar Este Evento</h1>
        <h2 className="font-accent text-xl">Acá podés editar tu evento</h2>
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
              <div className="flex gap-4">
                <button
                  onClick={() => handleEditEvent(event._id)} // Llama a la función dentro del evento de clic
                  className="bg-pink mt-4 px-2 rounded-md"
                >
                  Editar Evento
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default EditMyEvent;
