import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PuffLoader } from "react-spinners";
import editMyEvent from "../../functions/editMyEvent.js";
import getEventToEdit from "../../functions/getEventToEdit.js";

function EditMyEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsCreatingEvent(true);
    try {
      // Llama a createEvent pasando la función fetchMyEvents para actualizar la lista de eventos
      await editMyEvent(data, eventId /* , fetchMyEvents */);
      reset();
      setIsCreatingEvent(false);
      navigate("/mis-eventos");
    } catch (error) {
      console.error(error);
      setIsCreatingEvent(false);
    }
  };

  //------------------------
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //   const handleEditEvent = (eventId) => {
  //     editMyEvent(eventId, fetchEvents);
  //   };

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
            <form
              onSubmit={handleSubmit(onSubmit)}
              key={event._id}
              className="w-2/5 bg-opacity rounded-xl border p-8"
            >
              <div className="w-1/3">
                <label htmlFor="name">Nombre</label>
                <br />
                <input
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={event.name}
                  {...register("name", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.name && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="w-1/3">
                <label htmlFor="venue">Ubicación</label>
                <br />
                <input
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md  w-auto"
                  type="text"
                  name="venue"
                  id="venue"
                  defaultValue={event.venue}
                  {...register("venue", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.venue && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.venue.message}
                  </span>
                )}
              </div>
              <div className="w-1/3">
                <label htmlFor="category">Categoría</label>
                <br />
                <input
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md  w-auto"
                  type="text"
                  name="category"
                  id="category"
                  defaultValue={event.category}
                  {...register("category", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.category && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.category.message}
                  </span>
                )}
              </div>
              <div className="w-2/4">
                <label htmlFor="price">Precio</label>
                <br />
                <input
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
                  type="number"
                  name="price"
                  id="price"
                  defaultValue={event.price}
                  {...register("price", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.price && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.price.message}
                  </span>
                )}
              </div>
              <div className="w-2/4">
                <label htmlFor="date">Fecha del evento</label>
                <br />
                <input
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
                  type="date"
                  name="date"
                  id="date"
                  defaultValue={event.date ? event.date.slice(0, 10) : ""}
                  {...register("date", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.date && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.date.message}
                  </span>
                )}
              </div>
              <div className="w-full ">
                <label htmlFor="description">Descripción</label>
                <br />
                <textarea
                  className="bg-gray-700 border-solid h-24 border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-full"
                  name="description"
                  id="description"
                  defaultValue={event.description}
                  {...register("description", {
                    required: "Campo obligatorio",
                  })}
                ></textarea>
                {errors.description && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <button
                disabled={isCreatingEvent}
                type="submit"
                className="bg-pink text-light px-2 text-xl font-semibold rounded-md"
              >
                EDITAR EVENTO
              </button>
            </form>
          ))}
        </div>
      </section>
    </>
  );
}

export default EditMyEvent;
