// import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import createUser from "../../functions/createUser.js";
import { redirect } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      console.log(data); // Log the form data
      await createUser(data);
      reset();
      return redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border rounded-2xl bg-opacity p-8 w-1/3 mt-48 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" className="text-xs xl:text-base">
          Nombre de usuario
        </label>
        <br></br>
        <input
          className="bg-transparent p-2 border-lightblue border-2 rounded-xl mt-4 w-full mb-6"
          {...register("username", { required: true })}
          id="username"
          name="username"
          type="username"
        />
        {errors.email && (
          <span className="text-sm xl:text-base text-red-800 block text-right">
            Campo obligatorio
          </span>
        )}
        <br></br>
        <label htmlFor="email" className="text-xs xl:text-base">
          Email
        </label>
        <br></br>
        <input
          className="bg-transparent p-2 border-lightblue border-2 rounded-xl mt-4 w-full mb-6"
          {...register("email", { required: true })}
          id="email"
          name="email"
          type="email"
        />
        {errors.email && (
          <span className="text-sm xl:text-base text-red-800 block text-right">
            Campo obligatorio
          </span>
        )}
        <br></br>
        <label htmlFor="password" className="text-xs xl:text-base">
          Contraseña
        </label>
        <br></br>
        <input
          className="bg-transparent p-2 border-lightblue border-2 rounded-xl mt-4 w-full mb-6"
          {...register("password", { required: true })}
          id="password"
          name="password"
          type="password"
        />
        {errors.message && (
          <span className="text-sm xl:text-base text-red-800 block text-right">
            Campo obligatorio
          </span>
        )}
        <br></br>
        <label htmlFor="password2" className="text-xs xl:text-base">
          Repetir contraseña
        </label>
        <br></br>
        <input
          className="bg-transparent p-2 border-lightblue border-2 rounded-xl mt-4 w-full mb-6"
          {...register("password2", { required: true })}
          id="password2"
          name="password2"
          type="password2"
        />
        {errors.message && (
          <span className="text-sm xl:text-base text-red-800 block text-right">
            Campo obligatorio
          </span>
        )}
        <br></br>

        <button
          className="transition hover:bg-hover block mx-auto mt-4 bg-lightblue text-white py-2 px-10 text-xs xl:text-base rounded-xl cursor-pointer"
          type="submit"
        >
          Registrarme
        </button>
        <Link
          to="/iniciar-sesion"
          className="mx-auto text-lightblue hover:text-light"
        >
          Iniciar Sesión
        </Link>
      </form>
    </div>
  );
}

export default Register;
