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
    reset,
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
        toast.error("Error al registrarse");
        setIsLoading(false);
      } else {
        const email = res.email;
        const password = data.password;
        await login({ email, password });
        setIsLoading(false);
        reset();
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
    <main className="flex items-center justify-center h-[90vh] bg-pattern p-10">
      <div className="w-[500px] border-1 rounded-xl bg-blur bg-opacity p-8">
        <div className="flex flex-col aling mb-3 items-center">
          <h1 className="font-accent text-2xl text-pink">Registrate</h1>
          <div className="flex gap-1">
            <p className="text-sm">¿Ya tenés una cuenta?</p>
            <Link
              to="/iniciar-sesion"
              className="text-lightblue hover:text-blue-200 text-sm transition-all duration-300"
            >
              Iniciar Sesión.
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            type="text"
            label="Usuario"
            id="username"
            name="username"
            variant="bordered"
            className="mb-5"
            {...register("username", {
              required: "Campo obligatorio.",
            })}
            isInvalid={!!errors.username}
            errorMessage={errors.username && errors.username.message}
          />
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
            className="mb-5"
            {...register("password", {
              required: "Campo obligatorio.",
            })}
            isInvalid={!!errors.password}
            errorMessage={errors.password && errors.password.message}
          />
          <Input
            type="password"
            label="Confirmar contraseña"
            id="password2"
            name="password2"
            variant="bordered"
            className="mb-5"
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
            <Button className="w-full bg-pink text-light" type="submit">
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
