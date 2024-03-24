// import React from 'react'
import { useState } from "react";
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
        toast.error(response.error);
      } else {
        // setToken(response.jwToken);
        console.log("data.token", response.jwToken);
        console.log("data", response);
        setIsLoading(false);
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
    <main className="flex items-center justify-center">
      <div className="w-[400px]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            type="email"
            id="email"
            name="email"
            label="Email"
            labelPlacement="outside"
            placeholder="Ingrese su email"
            variant="bordered"
            className="mb-11"
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
            labelPlacement="outside"
            placeholder="Ingrese su contraseña"
            id="password"
            name="password"
            variant="bordered"
            {...register("password", {
              required: "Campo obligatorio",
            })}
            isInvalid={!!errors.password}
            errorMessage={errors.password && errors.password.message}
          />

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {isLoading && <PuffLoader color="#04b290" className="mx-auto" />}
          {!isLoading && (
            <Button
              className="w-full bg-white text-black font-medium rounded-full mt-6"
              type="submit"
            >
              Iniciar Sesión
            </Button>
          )}
          <Toaster
            containerStyle={{
              marginBottom: "8rem",
            }}
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
