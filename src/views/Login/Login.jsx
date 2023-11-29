// import React from 'react'
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../index.js";
import { PuffLoader } from "react-spinners";
import { Button, Input } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
      const response = await login(data);
      if (response.error) {
        setIsLoading(false);
        toast.error("Error al loguearse");
      } else {
        // setToken(response.jwToken);
        console.log("data.token", response.jwToken);
        console.log("data", response);
        setIsLoading(false);
        reset();
        toast.success("¡Iniciaste sesión!");
        setTimeout(() => {
          navigate("/");
          window.location.reload(true);
        }, 1500);
      }
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center h-[90vh] bg-pattern p-10">
      <div className="w-[500px] border-1 rounded-xl bg-blur bg-opacity p-8">
        <div className="flex flex-col aling mb-3 items-center">
          <h1 className="font-accent text-2xl text-green">Iniciar Sesión</h1>
          <div className="flex gap-1">
            <p className="text-sm">¿Nuevo en Ventra?</p>
            <Link
              to="/registrarse"
              className="text-lightblue hover:text-blue-200 text-sm transition-all duration-300"
            >
              Registrate gratis.
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            type="email"
            label="Email"
            id="email"
            name="email"
            variant="bordered"
            className="mb-5"
            {...register("email", {
              required: "Campo obligatorio.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Ingrese una dirección de correo electrónico válida.",
              },
            })}
            isInvalid={!!errors.email}
            errorMessage={errors.email && errors.email.message}
          />
          <Input
            type="password"
            label="Contraseña"
            id="password"
            name="password"
            variant="bordered"
            {...register("password", {
              required: "Campo obligatorio",
            })}
            isInvalid={!!errors.password}
            errorMessage={errors.password && errors.password.message}
          />

          <br></br>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {isLoading && <PuffLoader color="#04b290" className="mx-auto" />}
          {!isLoading && (
            <Button className="w-full bg-green text-black" type="submit">
              Iniciar Sesión
            </Button>
          )}
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
        </form>
      </div>
    </main>
  );
}

export { Login };
