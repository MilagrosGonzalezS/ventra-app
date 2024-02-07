import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PuffLoader } from "react-spinners";
import { userData, editMyProfile } from "../../index.js";
import { Button, Input } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

function EditProfile() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isEditingUser, setIsEditingUser] = useState(false);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsEditingUser(true);
    try {
      await editMyProfile(data, userId);
      setIsEditingUser(false);
      toast.success("Editaste tus datos con éxito");
      setTimeout(() => {
        navigate("/mi-cuenta");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Error al editar tus datos");
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
      <section className="min-h-screen flex flex-col items-center justify-center mt-4 bg-pattern px-10">
        <h1 className="font-accent font-medium text-3xl text-center text-green">
          Editar Datos Personales
        </h1>
        {isLoading ? (
          <PuffLoader
            className="absolute left-1/2 -translate-x-1/2 top-10"
            color="#04b290"
          />
        ) : (
          <div className="flex flex-col items-center gap-16 flex-wrap py-8 w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              key={user._id}
              className="md:w-2/5 bg-opacity rounded-xl border  p-8  "
            >
              <div className="flex flex-col w-full mb-4 md:p-3">
                <Input
                  label="Nombre de usuario"
                  type="text"
                  labelPlacement="outside"
                  placeholder="Nombre"
                  id="username"
                  name="username"
                  variant="bordered"
                  defaultValue={user.username}
                  {...register("username", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.username}
                  errorMessage={errors.username && errors.username.message}
                />
              </div>
              <div className="flex flex-col w-full md:p-3">
                <Input
                  type="email"
                  label="Email"
                  labelPlacement="outside"
                  id="email"
                  name="email"
                  variant="bordered"
                  defaultValue={user.email}
                  className="mb-5"
                  {...register("email", {
                    required: "Campo obligatorio.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message:
                        "Ingrese una dirección de correo electrónico válida.",
                    },
                  })}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email && errors.email.message}
                />
              </div>
              <Button
                className="w-full bg-green text-dark font-medium"
                type="submit"
              >
                Editar Datos
              </Button>
            </form>
          </div>
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
      </section>
    </>
  );
}

export { EditProfile };
