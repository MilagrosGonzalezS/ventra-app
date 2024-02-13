import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PuffLoader } from "react-spinners";
import {
  editMyEvent,
  getEventById,
  getEvents,
  deleteMyEvent,
  checkEventoToDelete,
  getCategories,
} from "../../index.js";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

function EditMyEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cover, setCover] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [hasTickets, sethasTickets] = useState(false);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const handleFileChange = (event) => {
    setCover(event.target.files[0]);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      if (hasTickets) {
        alert(
          "El evento no puede ser eliminado porque ya vendió una o más entradas"
        );
      } else {
        setEventToDelete(eventId); // Almacenar el ID del evento a eliminar
        setIsDeleteModalOpen(true); // Abrir el modal de confirmación;
      }
    } catch (error) {
      console.error(error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };
  console.log(eventToDelete);
  console.log(events);
  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsCreatingEvent(true);
    const eventData = cover ? { ...data, cover } : { ...data };
    console.log("eventData", eventData);
    try {
      await editMyEvent(eventData, eventId);
      setIsCreatingEvent(false);
      toast.success("Editaste tu evento con éxito");
      setTimeout(() => {
        navigate("/mi-cuenta");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.success("Error al editar tu evento");
      setIsCreatingEvent(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const res = await getEventById(eventId);
      setEvents(res.data);
      setIsLoading(false);

      // Verificar si hay tickets asociados al evento
      const hasTicketsResponse = await checkEventoToDelete(eventId);
      sethasTickets(hasTicketsResponse);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  //TRAER CATEGORIAS PARA SELECT
  useEffect(() => {
    getCategories().then((data) => {
      console.log("dataUseEffect", data);
      setCategories(data);
    });
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
              <div className="flex flex-col  w-full md:w-2/4 p-3">
                <Input
                  type="text"
                  label="Calle"
                  labelPlacement="outside"
                  placeholder="Nombre"
                  id="street"
                  name="street"
                  variant="bordered"
                  defaultValue={event.address.street}
                  {...register("street", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.street}
                  errorMessage={errors.street && errors.street.message}
                />
              </div>

              <div className="flex flex-col  w-full md:w-2/4 p-3">
                <Input
                  type="text"
                  label="Número"
                  labelPlacement="outside"
                  placeholder="1234"
                  id="number"
                  name="number"
                  variant="bordered"
                  defaultValue={event.address.number}
                  {...register("number", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.streetnumber}
                  errorMessage={errors.number && errors.number.message}
                />
              </div>

              <div className="flex flex-col w-full md:w-2/6 p-3">
                <Select
                  label="Zona"
                  labelPlacement="outside"
                  placeholder="Zona"
                  name="zone"
                  id="zone"
                  variant="bordered"
                  // defaultValue={event.zone}
                  defaultSelectedKeys={[event.zone]}
                  {...register("zone", {
                    required: "Campo obligatorio",
                  })}
                  isInvalid={!!errors.zone}
                  errorMessage={errors.zone && errors.zone.message}
                >
                  <SelectItem value="">Seleccioná un lugar</SelectItem>
                  <SelectItem key={"CABA"} value="CABA">
                    CABA
                  </SelectItem>
                  <SelectItem key={"Zona Norte"} value="Zona Norte">
                    Zona Norte
                  </SelectItem>
                  <SelectItem key={"Zona Oeste"} value="Zona Oeste">
                    Zona Oeste
                  </SelectItem>
                  <SelectItem key={"Zona Sur"} value="Zona Sur">
                    Zona Sur
                  </SelectItem>
                </Select>

                {errors.zone && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.zone.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-full md:w-2/6 p-3">
                <p>{console.log(event)}</p>
                <Select
                  label="Categoría"
                  labelPlacement="outside"
                  placeholder="Categoría"
                  name="category"
                  id="category"
                  variant="bordered"
                  defaultSelectedKeys={[event.category]}
                  {...register("category", {
                    required: "Campo obligatorio",
                  })}
                  isInvalid={!!errors.category}
                  errorMessage={errors.category && errors.category.message}
                >
                  {categories.sort().map((category) => (
                    <SelectItem
                      className="cursor-pointer"
                      key={category.name}
                      value={category.name}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              {events[0].isFree ? null : (
                <div className="w-full md:w-2/6 p-3">
                  <Input
                    label="Precio"
                    labelPlacement="outside"
                    type="text"
                    placeholder="0.00"
                    id="price"
                    name="price"
                    variant="bordered"
                    defaultValue={event.price}
                    {...register("price", {
                      required: "Campo obligatorio.",
                    })}
                    onChange={(e) => {
                      const input = e.target.value;
                      // Filtrar caracteres no numéricos
                      const filteredInput = input.replace(/\D/g, "");
                      setPrice(filteredInput);
                    }}
                    value={price}
                    isInvalid={!!errors.price}
                    errorMessage={errors.price && errors.price.message}
                    disabled={hasTickets} // Deshabilitar el input si hasTickets es true
                  />
                  {hasTickets && (
                    <p className="text-red-500 text-sm mt-2">
                      No se puede editar una vez vendidas las entradas.
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col w-full md:w-2/6 p-3">
                <Input
                  label="Cantidad de tickets"
                  labelPlacement="outside"
                  placeholder="0"
                  type="text"
                  id="ticketCount"
                  name="ticketCount"
                  variant="bordered"
                  {...register("ticketCount", {
                    required: "Campo obligatorio.",
                  })}
                  defaultValue={event.ticketCount}
                  isInvalid={!!errors.ticketCount}
                  errorMessage={
                    errors.ticketCount && errors.ticketCount.message
                  }
                  onChange={(e) => {
                    const input = e.target.value;
                    // Filtrar caracteres no numéricos
                    const filteredInput = input.replace(/\D/g, "");
                    setQuantity(filteredInput);
                  }}
                  value={quantity}
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
                        navigate("/mi-cuenta");
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
