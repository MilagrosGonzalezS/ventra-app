import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { completeCreatorData } from "../../index.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import toast, { Toaster } from "react-hot-toast";
import colors from "../../assets/imgs/recurso-colores.png";
import formpic from "../../assets/imgs/form.png";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
function CreatorData() {
  const [cbuCvu, setCbuCvu] = useState("");
  const [cuitCuil, setCuitCuil] = useState("");
  const [tokenExists, setTokenExists] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useContext(AuthContext);
  const token = auth;

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        setTokenExists(true);
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      await completeCreatorData(data);

      //MENSAJE
      console.log(data);
      toast.success("¡Datos completos!");
      setTimeout(() => {
        navigate("/mi-cuenta");
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsCreatingEvent(false);
    }
  };

  return isLoading ? (
    <PuffLoader
      className="absolute left-1/2 -translate-x-1/2 top-10"
      color="#04b290"
    />
  ) : tokenExists ? (
    <>
      <main className="createEvent-bg md:px-20 px-10 grid grid-cols-12 gap-x-10">
        <h1 className="font-accent font-medium text-3xl mx-auto col-span-full mt-32 mb-4">
          Datos del creador del evento
        </h1>
        <div className="col-span-full mx-auto">
          <img src={colors} />
        </div>
        <div className="mt-36 col-span-full flex mb-20">
          <div className="col-span-6 w-6/12 px-6">
            <h2 className="mb-8 text-xl">Datos del titular</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
              className="flex flex-wrap bg-opacity my-8"
            >
              <div className="flex flex-col w-full  p-3">
                <Input
                  label="Nombre del titular"
                  type="text"
                  labelPlacement="outside"
                  placeholder="Nombre"
                  id="nameOwner"
                  name="nameOwner"
                  variant="bordered"
                  {...register("nameOwner", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.nameOwner}
                  errorMessage={errors.nameOwner && errors.nameOwner.message}
                />
              </div>

              <div className="flex flex-col  w-full  p-3">
                <Input
                  type="text"
                  label="CUIT/CUIL"
                  labelPlacement="outside"
                  placeholder="CUIT/CUIL"
                  id="cuitCuil"
                  name="cuitCuil"
                  variant="bordered"
                  {...register("cuitCuil", {
                    required: "Campo obligatorio.",
                    pattern: {
                      value: /^\d{11}$/, // Expresión regular para asegurar que tenga 11 dígitos
                      message:
                        "El CUIT/CUIL debe tener exactamente 11 dígitos.",
                    },
                  })}
                  isInvalid={!!errors.cuitCuil}
                  errorMessage={errors.cuitCuil && errors.cuitCuil.message}
                  onChange={(e) => {
                    const inputQ = e.target.value;
                    // Filtrar caracteres no numéricos
                    const filteredInput = inputQ.replace(/\D/g, "");
                    setCuitCuil(filteredInput);
                  }}
                  value={cuitCuil}
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
                <Input
                  label="CBU/CVU"
                  labelPlacement="outside"
                  placeholder="0"
                  type="text"
                  id="cbuCvu"
                  name="cbuCvu"
                  variant="bordered"
                  maxLength={22}
                  {...register("cbuCvu", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.cbuCvu}
                  errorMessage={errors.cbuCvu && errors.cbuCvu.message}
                  onChange={(e) => {
                    const inputQ = e.target.value;
                    // Filtrar caracteres no numéricos
                    const filteredInput = inputQ.replace(/\D/g, "");
                    setCbuCvu(filteredInput);
                  }}
                  value={cbuCvu}
                />
              </div>
              <div className="flex gap-2 p-3">
                <p>
                  Recorda que es necesario completar estos{" "}
                  <span className="text-lightblue ">como creador</span> para
                  poder publicar tu evento.
                </p>
              </div>
              <div className="flex w-full justify-start p-3">
                <Button
                  type="submit"
                  className="bg-green text-dark w-5/12 font-medium"
                >
                  Guardar Datos
                </Button>
              </div>
              <Toaster position="center-center"></Toaster>
            </form>
          </div>
          <div className="col-span-6 w-6/12">
            <img className="w-10/12 mx-auto" src={formpic}></img>
          </div>
        </div>
      </main>
    </>
  ) : (
    <section className="min-h-screen flex flex-col justify-start mt-12">
      <Link
        to="/iniciar-sesion"
        className="block bg-lightblue py-2 px-4 mx-auto rounded-2xl mt-8"
      >
        Iniciar Sesión
      </Link>
    </section>
  );
}

export { CreatorData };
