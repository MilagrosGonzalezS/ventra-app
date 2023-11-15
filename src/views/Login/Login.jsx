// import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../index.js";
import { PuffLoader } from "react-spinners";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      console.log(data);
      const response = await login(data);

      if (response.error) {
        setIsLoading(false);

        setError(response.error);
      } else {
        // setToken(response.jwToken);
        console.log("data.token", response.jwToken);
        console.log("data", response);
        setIsLoading(false);
        reset();
        navigate("/");
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-2xl bg-opacity p-8 pb-6 w-1/3 mt-48 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="text-xs xl:text-base">
          Email
        </label>
        <br></br>
        <input
          className="bg-opacity p-2 border-lightblue border-2 rounded-xl mt-4 w-full mb-6"
          {...register("email", {
            required: "Campo obligatorio y debe ser un email válido",
            pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          })}
          id="email"
          name="email"
          type="email"
        />
        {errors.email && (
          <span className="text-xs xl:text-base text-red-500 block text-left -translate-y-4">
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
          <span className="text-xs xl:text-base text-red-500 block text-left -translate-y-4">
            {errors.password.message}
          </span>
        )}
        <br></br>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {isLoading && <PuffLoader color="#04b290" className="mx-auto" />}
        {!isLoading && (
          <button
            className="transition hover:bg-hover block mx-auto my-2 bg-lightblue text-white py-2 px-10 text-sm xl:text-base rounded-xl cursor-pointer"
            type="submit"
          >
            Iniciar Sesion
          </button>
        )}

        <Link
          to="/registrarse"
          className="mx-auto text-lightblue hover:text-light"
        >
          Registrarme
        </Link>
      </form>
    </div>
  );
}

export { Login };
