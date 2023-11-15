// import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login, createUser } from "../../index.js";
import { PuffLoader } from "react-spinners";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      console.log(data); // Log the form data
      await createUser(data).then(() => {
        const email = data.email;
        const password = data.password;
        setTimeout(() => {
          login({ email, password });
        }, [2000]);
      });
      setIsLoading(false);
      reset();
      navigate("/");
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
          className="bg-opacity p-2 border-lightblue border-2 rounded-xl mt-4 w-full mb-6"
          {...register("username", { required: "Campo obligatorio" })}
          id="username"
          name="username"
          type="username"
        />
        {errors.username && (
          <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
            {errors.username.message}
          </span>
        )}
        <br></br>
        <label htmlFor="email" className="text-xs xl:text-base">
          Email
        </label>
        <br></br>
        <input
          className="bg-opacity p-2 border-lightblue border-2 rounded-xl mt-4 w-full mb-6"
          {...register("email", {
            required: "Campo obligatorio",
            pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          })}
          id="email"
          name="email"
          type="email"
        />
        {errors.email && (
          <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
            {errors.email.message}
          </span>
        )}
        <br></br>
        <label htmlFor="password" className="text-xs xl:text-base">
          Contraseña
        </label>
        <br></br>
        <input
          className="bg-opacity p-2 border-lightblue border-2 rounded-xl mt-4 w-full mb-6"
          {...register("password", { required: "Campo obligatorio" })}
          id="password"
          name="password"
          type="password"
        />
        {errors.password && (
          <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
            {errors.password.message}
          </span>
        )}
        <br></br>
        <label htmlFor="password2" className="text-xs xl:text-base">
          Repetir contraseña
        </label>
        <br></br>
        <input
          className="bg-opacity p-2 border-lightblue border-2 rounded-xl mt-4 w-full mb-6"
          {...register("password2", { required: "Campo obligatorio" })}
          id="password2"
          name="password2"
          type="password"
        />
        {errors.password2 && (
          <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
            {errors.password2.message}
          </span>
        )}
        <br></br>
        {isLoading && <PuffLoader color="#04b290" className="mx-auto" />}
        {!isLoading && (
          <button
            className="transition hover:bg-hover block mx-auto mt-4 bg-lightblue text-white py-2 px-10 text-xs xl:text-base rounded-xl cursor-pointer"
            type="submit"
          >
            Registrarme
          </button>
        )}

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

export { Register };
