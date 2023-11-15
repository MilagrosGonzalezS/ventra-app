import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PuffLoader } from "react-spinners";
import { userData, editMyProfile } from "../../index.js";

function EditProfile() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isEditingUser, setIsEditingUser] = useState(false);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsEditingUser(true);
    try {
      await editMyProfile(data, userId);
      reset();
      setIsEditingUser(false);
      navigate("/mi-cuenta");
    } catch (error) {
      console.error(error);
      setIsEditingUser(false);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const data = await userData();
      console.log(data);
      setUser(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="flex-col items-center mt-4">
        <h1 className="font-accent text-2xl text-center">
          Editar Datos Personales
        </h1>
        <h2 className="font-accent text-xl text-center">
          Acá podés editar tus datos
        </h2>
        {isLoading ? (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        ) : (
          <div className="flex flex-col items-center gap-16 flex-wrap ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              key={user._id}
              className="w-2/5 bg-opacity rounded-xl border p-8"
            >
              <div className="w-1/3">
                <label htmlFor="name">Nombre</label>
                <br />
                <input
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
                  type="text"
                  name="username"
                  id="username"
                  defaultValue={user.username}
                  {...register("username", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.username && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="w-1/3">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md  w-auto"
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user.email}
                  {...register("email", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.email && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <button
                disabled={isEditingUser}
                type="submit"
                className="bg-pink text-light px-2 text-xl font-semibold rounded-md"
              >
                EDITAR DATOS
              </button>
            </form>
          </div>
        )}
      </section>
    </>
  );
}

export { EditProfile };
