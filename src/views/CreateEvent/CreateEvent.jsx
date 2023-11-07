import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import fetchMyEvents from "../../functions/getMyEvents";
import createEvent from "../../functions/createEvent";
import userData from "../../functions/userData";

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

  useEffect(() => {
    const checkToken = async () => {
      const data = await userData();
      console.log(data.token);
      if (data.token) {
        setTokenExists(true);
      }
      setIsLoading(false); // Detén el loader una vez que se ha verificado el token
    };

    checkToken();
  }, []);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsCreatingEvent(true);

    try {
      await createEvent(data, fetchMyEvents);
      reset();
      setIsCreatingEvent(false);
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
      <div className="flex justify-center my-8">
        <h1 className="text-4xl font-accent text-pink font-semibold">
          CREÁ TU EVENTO
        </h1>
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap lg:flex-row lg:items-center lg:justify-evenly bg-opacity text-light p-8 rounded-3xl w-10/12 "
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
            <label htmlFor="venue">Ubicación</label>
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
            <label htmlFor="category">Categoría</label>
            <br />
            <input
              className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md  w-auto"
              type="text"
              name="category"
              id="category"
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

export default CreateEvent;
