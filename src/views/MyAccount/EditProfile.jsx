import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { PuffLoader } from "react-spinners";
import { userData, editMyProfile } from "../../index.js";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

function EditProfile() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const navigate = useNavigate();
  const [cbuCvu, setCbuCvu] = useState();
  const [cuitCuil, setCuitCuil] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  // console.log(user);
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
      // console.log(data);
      setUser(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center mt-4 bg-pattern px-10">
        <h1 className="font-accent font-medium text-3xl text-center text-green">
          Editar Datos De Mi Cuenta
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
              <div className="flex flex-col w-full md:p-3">
                <Input
                  type="text"
                  label="Titular Datos Bancarios"
                  labelPlacement="outside"
                  id="nameOwner"
                  name="nameOwner"
                  variant="bordered"
                  defaultValue={user.nameOwner}
                  className="mb-5"
                  {...register("nameOwner", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.nameOwner}
                  errorMessage={errors.nameOwner && errors.nameOwner.message}
                />
              </div>
              <div className="flex flex-col w-full md:p-3">
                <Controller
                  name="cuitCuil"
                  control={control}
                  rules={{
                    required: "Campo obligatorio.",
                    validate: (value) =>
                      (value.length === 11 && /^\d+$/.test(value)) ||
                      "El campo debe tener exactamente 11 caracteres y contener solo números.",
                  }}
                  value={cuitCuil}
                  defaultValue={user.cuitCuil}
                  render={({ field }) => (
                    <Input
                      label="CUIT/CUIL"
                      labelPlacement="outside"
                      placeholder="0"
                      type="text"
                      id="cuitCuil"
                      name="cuitCuil"
                      variant="bordered"
                      maxLength={11}
                      {...field}
                      isInvalid={!!errors.cuitCuil}
                      errorMessage={errors.cuitCuil && errors.cuitCuil.message}
                      onChange={(e) => {
                        const inputQ = e.target.value;
                        // Filtrar caracteres no numéricos
                        const filteredInput = inputQ.replace(/\D/g, "");
                        setCuitCuil(filteredInput);
                        field.onChange(filteredInput); // Actualiza el valor del campo en el formulario
                      }}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col w-full  p-3">
                <Select
                  label="Banco"
                  labelPlacement="outside"
                  placeholder="Seleccioná tu banco"
                  className="w-full"
                  variant="bordered"
                  name="bank"
                  id="bank"
                  {...register("bank", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.bank}
                  errorMessage={errors.bank && errors.bank.message}
                  defaultSelectedKeys={[user.bank]}
                >
                  <SelectItem key="BBVA" value="BBVA">
                    BBVA
                  </SelectItem>
                  <SelectItem key="Banco Galicia" value="Banco Galicia">
                    Banco Galicia
                  </SelectItem>
                  <SelectItem key="Banco Nación" value="Banco Nación">
                    Banco Nación
                  </SelectItem>
                  <SelectItem key="Banco Provincia" value="Banco Provincia">
                    Banco Provincia
                  </SelectItem>
                  <SelectItem key="Brubank" value="Brubank">
                    Brubank
                  </SelectItem>
                  <SelectItem key="Mercado Pago" value="Mercado Pago">
                    Mercado Pago
                  </SelectItem>
                  <SelectItem key="Santander" value="Santander">
                    Santander
                  </SelectItem>
                  <SelectItem key="Supervielle" value="Supervielle">
                    Supervielle
                  </SelectItem>
                  <SelectItem key="Ualá" value="Ualá">
                    Ualá
                  </SelectItem>
                </Select>
              </div>
              <div className="flex flex-col w-full p-3">
                <Controller
                  name="cbuCvu"
                  control={control}
                  rules={{
                    required: "Campo obligatorio.",
                    validate: (value) =>
                      (value.length === 22 && /^\d+$/.test(value)) ||
                      "El campo debe tener exactamente 22 caracteres y contener solo números.",
                  }}
                  defaultValue={user.cbuCvu}
                  value={cbuCvu}
                  render={({ field }) => (
                    <Input
                      label="CBU/CVU"
                      labelPlacement="outside"
                      placeholder="0"
                      type="text"
                      id="cbuCvu"
                      name="cbuCvu"
                      variant="bordered"
                      maxLength={22}
                      {...field}
                      isInvalid={!!errors.cbuCvu}
                      errorMessage={errors.cbuCvu && errors.cbuCvu.message}
                      onChange={(e) => {
                        const inputQ = e.target.value;
                        // Filtrar caracteres no numéricos
                        const filteredInput = inputQ.replace(/\D/g, "");
                        setCbuCvu(filteredInput);
                        field.onChange(filteredInput); // Actualiza el valor del campo en el formulario
                      }}
                    />
                  )}
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
