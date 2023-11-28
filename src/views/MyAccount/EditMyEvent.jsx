import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PuffLoader } from "react-spinners";
import { editMyEvent, getEventById } from "../../index.js";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";

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

  const handleFileChange = (event) => {
    setCover(event.target.files[0]);
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsCreatingEvent(true);
    const eventData = cover ? { ...data, cover } : { ...data };
    console.log("eventData", eventData);
    try {
      await editMyEvent(eventData, eventId);
      setIsCreatingEvent(false);
      reset();
      navigate("/mis-eventos");
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
  }, []);

  return (
    <main className="h-auto bg-login">
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
        <div className="">
          {events.map((event) => (
            <form
              onSubmit={handleSubmit(onSubmit)}
              key={event._id}
              className="flex flex-wrap bg-opacity p-10"
              encType="multipart/form-data"
            >
              <p className="text-red-500">
                No es posible cambiar la modalidad de gratuito o pago, para ello
                debes eliminar el evento y volver a crearlo.
              </p>

              <div className="flex flex-col w-2/4 p-3">
                <Input
                  label="Nombre del Evento"
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
              {/* <div className="w-1/3">
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
              </div> */}
              <div className="flex flex-col w-2/4 p-3">
                <Input
                  type="text"
                  label="Lugar del Evento"
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
              {/* <div className="w-1/3">
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
              </div> */}
              {/* <div className="flex flex-col w-2/6 p-3">
                <Select
                  label="Zona del evento"
                  labelPlacement="outside"
                  placeholder="Selecciona un lugar"
                  className="w-full"
                  variant="bordered"
                  name="zone"
                  id="zone"
                  {...register("zone", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.zone}
                  errorMessage={errors.zone && errors.zone.message}
                >
                  <SelectItem key="CABA" value="CABA">
                    CABA
                  </SelectItem>
                  <SelectItem key="Zona Norte" value="Zona Norte">
                    Zona Norte
                  </SelectItem>
                  <SelectItem key="Zona Oeste" value="Zona Oeste">
                    Zona Oeste
                  </SelectItem>
                  <SelectItem key="Zona Sur" value="Zona Sur">
                    Zona Sur
                  </SelectItem>
                </Select>
              </div> */}
              <div className="flex flex-col w-2/6 p-3">
                <label htmlFor="zone">Zona del evento</label>
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
              {/* <div className="flex flex-col w-2/6 p-3">
                <Select
                  label="Categoría"
                  labelPlacement="outside"
                  placeholder="Selecciona una categoría"
                  className="w-full"
                  variant="bordered"
                  name="category"
                  id="category"
                  {...register("category", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.category}
                  errorMessage={errors.category && errors.category.message}
                >
                  <SelectItem key="Concierto de Rock" value="Concierto de Rock">
                    Concierto de Rock
                  </SelectItem>
                  <SelectItem key="Concierto De Pop" value="Concierto De Pop">
                    Concierto De Pop
                  </SelectItem>
                  <SelectItem
                    key="Fiesta Electrónica"
                    value="Fiesta Electrónica"
                  >
                    Fiesta Electrónica
                  </SelectItem>
                  <SelectItem key="Concierto De Rap" value="Concierto De Rap">
                    Concierto De Rap
                  </SelectItem>
                  <SelectItem
                    key="Festival De Bandas"
                    value="Festival De Bandas"
                  >
                    Festival De Bandas
                  </SelectItem>
                  <SelectItem key="Fiesta" value="Fiesta">
                    Fiesta
                  </SelectItem>
                  <SelectItem key="Cumpleaños" value="Cumpleaños">
                    Cumpleaños
                  </SelectItem>
                  <SelectItem key="Reunión" value="Reunión">
                    Reunión
                  </SelectItem>
                </Select>
              </div> */}
              <div className="flex flex-col w-2/6 p-3">
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
              <div className="w-2/6 p-3">
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
              {/* <div className="w-2/4">
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
              </div> */}
              <div className="flex flex-col w-2/6 p-3">
                <Input
                  label="Cantidad de Tickets"
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

              <div className="flex flex-col w-2/6 p-3">
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

              <div className="flex flex-col w-2/6 p-3">
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

              {/* <div className="w-2/4">
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
              </div> */}

              <div className="flex flex-col w-2/6 p-3">
                <RadioGroup
                  label="Visibilidad del evento"
                  orientation="horizontal"
                  defaultValue={event.visibility}
                  {...register("visibility", {
                    required: "Selecciona la visibilidad del evento.",
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
                      required: "Selecciona la visibilidad del evento.",
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
                      required: "Selecciona la visibilidad del evento.",
                    })}
                    errorMessage={
                      errors.visibility && errors.visibility.message
                    }
                  >
                    Público
                  </Radio>
                </RadioGroup>
              </div>

              {/* <div className="w-2/4">
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
              </div> */}

              <div className="flex flex-col w-2/6 p-3">
                <label htmlFor="cover">Portada del evento</label>
                <br />
                <input
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 rounded-md w-auto"
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
              {/* <div className="w-full ">
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
              </div> */}
              {/* <div className="w-2/4">
                <label htmlFor="cover">Portada del evento</label>
                <br />
                <input
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
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
              </div> */}
              {/* <button
                disabled={isCreatingEvent}
                type="submit"
                className="bg-pink text-light px-2 text-xl font-semibold rounded-md"
              >
                EDITAR EVENTO
              </button> */}
              <div className="flex w-full justify-start p-3">
                <Button
                  disabled={isCreatingEvent}
                  type="submit"
                  className="bg-pink text-light w-5/12"
                >
                  Editar evento
                </Button>
              </div>
            </form>
          ))}
        </div>
      </section>
    </main>
  );
}

export { EditMyEvent };
