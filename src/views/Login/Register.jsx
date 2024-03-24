import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login, createUser } from "../../index.js";
import { PuffLoader } from "react-spinners";
import { Button, Input } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      console.log(data); // Log the form data
      const res = await createUser(data);
      if (res.error) {
        console.log(res.error);
        // toast.error(res.error.response.data.error);
        toast.error(res.error);
        setIsLoading(false);
      } else {
        const email = res.email;
        const password = data.password;
        await login({ email, password });
        setIsLoading(false);
        toast.success("¡Te registraste!");
        setTimeout(() => {
          navigate("/");
          window.location.reload(true);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex items-center justify-center">
      <div className="w-[400px]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            type="text"
            label="Usuario"
            id="username"
            labelPlacement="outside"
            placeholder="Ingrese su usuario"
            name="username"
            variant="bordered"
            className="mb-11"
            {...register("username", {
              required: "Campo obligatorio.",
              minLength: {
                value: 3,
                message: "El usuario debe tener al menos 3 caracteres",
              },
            })}
            isInvalid={!!errors.username}
            errorMessage={errors.username && errors.username.message}
          />
          <Input
            type="email"
            label="Email"
            labelPlacement="outside"
            placeholder="Ingrese su email"
            id="email"
            name="email"
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
            className="mb-2"
            {...register("password", {
              required: "Campo obligatorio.",
            })}
            isInvalid={!!errors.password}
            errorMessage={errors.password && errors.password.message}
          />
          <p className="text-xs mb-11 text-gray-400 font-light">
            La contraseña debe tener al menos 6 caracteres, una letra mayúsucula
            y un número.
          </p>
          <Input
            type="password"
            label="Confirmar contraseña"
            id="password2"
            labelPlacement="outside"
            placeholder="Confirme su contraseña"
            name="password2"
            variant="bordered"
            className=""
            {...register("password2", {
              required: "Campo obligatorio.",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden.",
            })}
            isInvalid={!!errors.password2}
            errorMessage={errors.password2 && errors.password2.message}
          />

          {isLoading && <PuffLoader color="#04b290" className="mx-auto" />}
          {!isLoading && (
            <Button
              className="w-full bg-white text-black font-medium rounded-full mt-6"
              type="submit"
            >
              Crear cuenta
            </Button>
          )}
        </form>
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
      </div>
    </main>
  );
}

export { Register };
