// import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import login from "../../functions/login.js";
import { useNavigate } from "react-router-dom";
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
      await login(data).then((data) => {
        const token = data.jwToken;
        console.log(token);
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

        {isLoading && <PuffLoader color="#04b290" className="mx-auto" />}
        {!isLoading && (
          <button
            className="transition hover:bg-hover block mx-auto mt-4 bg-lightblue text-white py-2 px-10 text-xs xl:text-base rounded-xl cursor-pointer"
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

export default Register;
