import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PuffLoader } from "react-spinners";
import {
  editMyEvent,
  getEventById,
  getEvents,
  deleteMyEvent,
} from "../../index.js";
import { Button, Input, Radio, RadioGroup, Textarea } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

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
  const [cover, setCover] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleFileChange = (event) => {
    setCover(event.target.files[0]);
  };

  const handleDeleteEvent = (eventId) => {
    console.log(eventId);
    setEventToDelete(eventId); // Almacenar el ID del evento a eliminar
    setIsDeleteModalOpen(true); // Abrir el modal de confirmación
  };
  console.log(eventToDelete);
  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsCreatingEvent(true);
    const eventData = cover ? { ...data, cover } : { ...data };
    console.log("eventData", eventData);
    try {
      await editMyEvent(eventData, eventId);
      setIsCreatingEvent(false);
      reset();
      toast.success("Editaste tu evento con éxito");
      setTimeout(() => {
        navigate("/mis-eventos");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.success("Error al editar tu evento");
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
  }, []);

  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-start px-10 mb-6">
        <h1 className="font-accent font-medium text-orange text-3xl px-3 my-4">
          Administrá tu evento
        </h1>
        {isLoading && (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        )}
        <div>
          {events.map((event) => (
            <form
              onSubmit={handleSubmit(onSubmit)}
              key={event._id}
              className="flex flex-wrap bg-opacity"
              encType="multipart/form-data"
            >
              <div className="flex flex-col w-full md:w-2/4 p-3">
                <Input
                  label="Nombre del evento"
                  type="text"
                  labelPlacement="outside"
                  placeholder="Nombre"
                  defaultValue={event.name}
                  id="name"
                  name="name"
                  variant="bordered"
                  {...register("name", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name && errors.name.message}
                />
              </div>
              <div className="flex flex-col w-full md:w-2/4 p-3">
                <Input
                  type="text"
                  label="Lugar del evento"
                  labelPlacement="outside"
                  placeholder="Lugar"
                  id="venue"
                  name="venue"
                  variant="bordered"
                  defaultValue={event.venue}
                  {...register("venue", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.venue}
                  errorMessage={errors.venue && errors.venue.message}
                />
              </div>

              <div className="flex flex-col w-full md:w-2/6 p-3">
                <label className="text-sm" htmlFor="zone">
                  Zona del evento
                </label>

                <select
                  className="bg-opacity border-solid border-1 border-gray-500 py-1.5 mb-8 mt-1 px-2 rounded-xl w-auto"
                  name="zone"
                  id="zone"
                  defaultValue={event.zone}
                  {...register("zone", {
                    required: "Campo obligatorio",
                  })}
                >
                  <option value="">Seleccioná un lugar</option>
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

              <div className="flex flex-col w-full md:w-2/6 p-3">
                <label className="text-sm" htmlFor="category">
                  Categoría
                </label>

                <select
                  className="bg-opacity border-solid border-1 border-gray-500 mb-8 mt-1 px-2 py-1.5 rounded-xl  w-auto"
                  name="category"
                  id="category"
                  defaultValue={event.category}
                  {...register("category", {
                    required: "Campo obligatorio",
                  })}
                >
                  <option value="">Seleccioná una categoría</option>
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
              {events[0].isFree ? null : (
                <div className="w-full md:w-2/6 p-3">
                  <Input
                    label="Precio"
                    labelPlacement="outside"
                    type="number"
                    placeholder="0.00"
                    id="price"
                    name="price"
                    variant="bordered"
                    defaultValue={event.price}
                    onChange={(e) => setPrice(e.target.value)}
                    {...register("price", {
                      required: "Campo obligatorio.",
                    })}
                    isInvalid={!!errors.price}
                    errorMessage={errors.price && errors.price.message}
                  />
                </div>
              )}

              <div className="flex flex-col w-full md:w-2/6 p-3">
                <Input
                  label="Cantidad de tickets"
                  labelPlacement="outside"
                  placeholder="0"
                  type="number"
                  id="ticketCount"
                  name="ticketCount"
                  variant="bordered"
                  defaultValue={event.ticketCount}
                  {...register("ticketCount", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.ticketCount}
                  errorMessage={
                    errors.ticketCount && errors.ticketCount.message
                  }
                />
              </div>

              <div className="flex flex-col md:w-2/6 p-3">
                <Input
                  label="Fecha"
                  labelPlacement="outside"
                  placeholder=" "
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={event.date ? event.date.slice(0, 10) : ""}
                  variant="bordered"
                  {...register("date", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.date}
                  errorMessage={errors.date && errors.date.message}
                />
              </div>

              <div className="flex flex-col md:w-2/6 p-3">
                <Input
                  label="Hora"
                  labelPlacement="outside"
                  placeholder=" "
                  type="time"
                  id="time"
                  name="time"
                  variant="bordered"
                  defaultValue={event.time}
                  {...register("time", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.time}
                  errorMessage={errors.time && errors.time.message}
                />
              </div>

              <div className="flex flex-col md:w-2/6 p-3">
                <RadioGroup
                  label="Visibilidad del evento"
                  orientation="horizontal"
                  defaultValue={event.visibility}
                  {...register("visibility", {
                    required: "Seleccioná la visibilidad del evento.",
                  })}
                  isInvalid={!!errors.visibility}
                  errorMessage={errors.visibility && errors.visibility.message}
                >
                  <Radio
                    id="private"
                    name="visibility"
                    value="private"
                    defaultChecked={event.visibility === "private"}
                    {...register("visibility", {
                      required: "Seleccioná la visibilidad del evento.",
                    })}
                    errorMessage={
                      errors.visibility && errors.visibility.message
                    }
                  >
                    Privado
                  </Radio>
                  <Radio
                    id="public"
                    name="visibility"
                    value="public"
                    defaultChecked={event.visibility === "public"}
                    {...register("visibility", {
                      required: "Seleccioná la visibilidad del evento.",
                    })}
                    errorMessage={
                      errors.visibility && errors.visibility.message
                    }
                  >
                    Público
                  </Radio>
                </RadioGroup>
              </div>

              <div className="flex flex-col w-full  md:w-2/6 p-3">
                <label htmlFor="cover" className="text-base mb-3">
                  Portada del evento
                </label>
                <input
                  className="bg-opacity border-solid border-1  border-light mb-8 rounded-md w-auto"
                  type="file"
                  name="cover"
                  id="cover"
                  onChange={handleFileChange}
                />
                {errors.cover && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.cover.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-full p-3">
                <Textarea
                  label="Descripción"
                  labelPlacement="outside"
                  variant="bordered"
                  name="description"
                  id="description"
                  placeholder="Descripción del evento"
                  defaultValue={event.description}
                  {...register("description", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.description}
                  errorMessage={
                    errors.description && errors.description.message
                  }
                />
              </div>
              <div className="flex flex-col w-full md:w-2/4 gap-2 p-3">
                <Button
                  disabled={isCreatingEvent}
                  type="submit"
                  className="bg-pink font-medium text-light w-1/3"
                >
                  Editar evento
                </Button>
                <p className="px-3 my-4">
                  Si deseás cambiar la modalidad gratuito/pago, debés eliminar
                  el evento y volver a crearlo.
                </p>
                <Button
                  onClick={() => handleDeleteEvent(eventId)}
                  className="bg-red-700 font-medium text-light w-1/3"
                >
                  Eliminar evento
                </Button>
              </div>
            </form>
          ))}
          {isDeleteModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center  bg-gray-800 bg-opacity-70 z-50">
              <div className="bg-dark rounded-lg p-8 fixed A m-4 border">
                <p className="text-light text-lg">
                  ¿Estás seguro de que deseás eliminar este evento?
                </p>
                <div className="mt-4 flex justify-center gap-16">
                  <button
                    onClick={() => {
                      deleteMyEvent(eventToDelete).then(() => {
                        getEvents();
                        navigate("/mis-eventos");
                      });

                      setIsDeleteModalOpen(false); // Cerrar el modal después de eliminar
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-xl mr-4"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(false); // Cerrar el modal sin eliminar
                    }}
                    className="bg-green text-dark px-4 py-2 rounded-xl"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Toaster
          position="center-center"
          toastOptions={{
            success: {
              style: {
                background: "#232323",
                color: "#FCFCFC",
              },
            },
            error: {
              style: {
                background: "#232323",
                color: "#FCFCFC",
              },
            },
          }}
        />
      </section>
    </main>
  );
}

export { EditMyEvent };
