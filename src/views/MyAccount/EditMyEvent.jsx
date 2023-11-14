import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PuffLoader } from "react-spinners";
import editMyEvent from "../../functions/editMyEvent.js";
import getEventById from "../../functions/getEventById.js";

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
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsCreatingEvent(true);

    try {
      await editMyEvent(data, eventId);
      setIsCreatingEvent(false);
      //MENSAJE
      setTimeout(() => {
        reset();
        navigate("/mis-eventos");
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsCreatingEvent(false);
    }
  };

  const fetchEvents = () => {
    setIsLoading(true);
    getEventById(eventId)
      .then((res) => {
        setEvents(res.data);
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
        <h1 className="font-accent text-2xl text-center">Editar Este Evento</h1>
        <h2 className="font-accent text-xl text-center mb-4">
          Acá podés editar tu evento
        </h2>
        {isLoading && (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        )}
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
                <label htmlFor="venue">Lugar del evento</label>
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
                <label htmlFor="zone">Ubicación del evento</label>
                <br />
                <select
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
                  name="zone"
                  id="zone"
                  defaultValue={event.zone}
                  {...register("zone", {
                    required: "Campo obligatorio",
                  })}
                >
                  <option value="">Selecciona un lugar</option>
                  <option value="CABA">CABA</option>
                  <option value="Zona Norte">Zona Norte</option>
                  <option value="Zona Oeste">Zona Oeste</option>
                  <option value="Zona Sur">Zona Sur</option>
                </select>

                {errors.zone && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.zone.message}
                  </span>
                )}
              </div>
              <div className="w-1/3">
                <label htmlFor="category">Categoría</label>
                <br />
                <select
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md  w-auto"
                  name="category"
                  id="category"
                  defaultValue={event.category}
                  {...register("category", {
                    required: "Campo obligatorio",
                  })}
                >
                  <option value="">Selecciona una categoría</option>
                  {[
                    "Concierto De Rock",
                    "Concierto De Pop",
                    "Fiesta Electrónica",
                    "Concierto De Rap",
                    "Festival De Bandas",
                    "Fiesta",
                    "Cumpleaños",
                    "Reunión",
                  ]
                    .sort()
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
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
                  onChange={(e) => setPrice(e.target.value)}
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
              <div className="w-2/4">
                <label htmlFor="time">Horario</label>
                <br />
                <input
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
                  type="time"
                  name="time"
                  id="time"
                  defaultValue={event.time}
                  {...register("time", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.time && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.time.message}
                  </span>
                )}
              </div>
              <div className="w-2/4">
                <label htmlFor="ticketCount">Cantidad de tickets</label>
                <br />
                <input
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
                  type="number"
                  name="ticketCount"
                  id="ticketCount"
                  defaultValue={event.ticketCount}
                  {...register("ticketCount", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.ticketCount && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.ticketCount.message}
                  </span>
                )}
              </div>
              <div className="w-2/4">
                <label htmlFor="visibility" className="mr-2">
                  Visibilidad del evento
                </label>
                <br />
                <input
                  type="radio"
                  id="private"
                  name="visibility"
                  value="private"
                  defaultChecked={event.visibility === "private"}
                  {...register("visibility", {
                    required: "Selecciona la visibilidad del evento",
                  })}
                />
                <label htmlFor="private" className="mr-2">
                  Privado
                </label>
                <input
                  type="radio"
                  id="public"
                  name="visibility"
                  value="public"
                  defaultChecked={event.visibility === "public"}
                  {...register("visibility", {
                    required: "Selecciona la visibilidad del evento",
                  })}
                />
                <label htmlFor="public">Público</label>
                {errors.visibility && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.visibility.message}
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
              <div className="w-2/4">
                <label htmlFor="cover">Portada del evento</label>
                <br />
                <input
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
                  type="file"
                  name="cover"
                  id="cover"
                  {...register("cover")}
                />
                {errors.cover && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.cover.message}
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
