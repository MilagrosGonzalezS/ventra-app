import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { createEvent } from "../../index.js";
import { AuthContext } from "../../context/AuthContext.jsx";
function CreateEvent() {
  const [tokenExists, setTokenExists] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState(0);
  const [cover, setCover] = useState(null);
  const { auth } = useContext(AuthContext);
  const token = { token: auth };

  const handleFileChange = (event) => {
    setCover(event.target.files[0]);
  };

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        setTokenExists(true);
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsCreatingEvent(true);
    data = price === 0 ? { ...data, cover, price } : { ...data, cover };
    console.log(cover);
    console.log("data", data);
    console.log("price", price);
    try {
      await createEvent(data);
      setIsCreatingEvent(false);
      //MENSAJE
      reset();
      navigate("/mis-eventos");
    } catch (error) {
      console.error(error);
      setIsCreatingEvent(false);
    }
  };

  return isLoading ? (
    <PuffLoader
      className="absolute left-1/2 -translate-x-1/2 top-10"
      color="#04b290"
    />
  ) : tokenExists ? (
    <>
      <div className="flex justify-center pt-32 pb-8">
        <h1 className="text-4xl font-accent text-pink font-semibold">
          CREÁ TU EVENTO
        </h1>
      </div>
      <div className="flex justify-center pb-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap lg:flex-row lg:items-center lg:justify-evenly bg-opacity text-light p-8 rounded-3xl w-10/12"
          encType="multipart/form-data"
        >
          <div className="w-1/3">
            <label htmlFor="name">Nombre</label>
            <br />
            <input
              className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
              type="text"
              name="name"
              id="name"
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
            <label htmlFor="isFree" className="mr-2">
              ¿Es un evento gratuito o pago?
            </label>
            <br />
            <input
              type="radio"
              id="freeEvent"
              name="isFree"
              value="true"
              {...register("isFree", {
                required: "Selecciona la visibilidad del evento",
              })}
              onChange={() => {
                setIsFree(true);
                setPrice(0);
              }}
            />
            <label htmlFor="freeEvent" className="mr-2">
              Gratuito
            </label>
            <input
              type="radio"
              id="payEvent"
              name="isFree"
              value="false"
              {...register("isFree", {
                required: "Selecciona la visibilidad del evento",
              })}
              onChange={() => {
                setIsFree(false);
                setPrice();
              }}
            />
            <label htmlFor="payEvent">Pago</label>
            {errors.isFree && (
              <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                {errors.isFree.message}
              </span>
            )}
          </div>
          {!isFree && (
            <div className="w-2/4">
              <label htmlFor="price">Precio</label>
              <br />
              <input
                className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
                type="number"
                name="price"
                id="price"
                value={price}
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
          )}

          <div className="w-2/4">
            <label htmlFor="date">Fecha del evento</label>
            <br />
            <input
              className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
              type="date"
              name="date"
              id="date"
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
              onChange={handleFileChange}
            />
            {errors.cover && (
              <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                {errors.cover.message}
              </span>
            )}
          </div>
          <div className="w-2/4">
            <label htmlFor="termsAndConditions">Terminos y Condiciones</label>
            <br />
            <input
              className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
              type="checkbox"
              name="termsAndConditions"
              id="termsAndConditions"
              {...register("termsAndConditions", {
                required: "Los términos y condiciones son obligatorios.",
              })}
            />
            {errors.termsAndConditions && (
              <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                {errors.termsAndConditions.message}
              </span>
            )}
          </div>
          <button
            disabled={isCreatingEvent}
            type="submit"
            className="bg-green text-dark px-2 text-xl font-semibold rounded-md"
          >
            CREAR EVENTO
          </button>
        </form>
      </div>
    </>
  ) : (
    <div className="flex justify-center my-8">
      <h1 className="text-4xl font-accent text-center text-pink font-semibold">
        TENÉS QUE INICAR SESIÓN <br /> PARA PODER CREAR UN EVENTO
      </h1>
    </div>
  );
}

export { CreateEvent };
