import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { createEvent, TermsText } from "../../index.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import toast, { Toaster } from "react-hot-toast";
import colors from "../../assets/imgs/recurso-colores.png";
import formpic from "../../assets/imgs/form.png";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
function CreateEvent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tokenExists, setTokenExists] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState(0);
  const [cover, setCover] = useState(null);
  const { auth } = useContext(AuthContext);
  const token = auth;

  const handleFileChange = (event) => {
    setCover(event.target.files[0]);
  };

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
    setIsCreatingEvent(true);
    data = price === 0 ? { ...data, cover, price } : { ...data, cover };
    try {
      await createEvent(data);
      setIsCreatingEvent(false);
      //MENSAJE
      toast.success("¡Evento Creado!");
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
          Crear evento
        </h1>
        <div className="col-span-full mx-auto">
          <img src={colors} />
        </div>
        <div className="mt-36 col-span-full flex mb-20">
          <div className="col-span-6 w-6/12 px-6">
            <h2 className="mb-8 text-xl">¡Ingresá los datos de tu evento!</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
              className="flex flex-wrap bg-opacity w-full "
            >
              <div className="flex flex-col w-11/12 my-2">
                <Input
                  label="Nombre del evento"
                  type="text"
                  labelPlacement="outside"
                  placeholder="Nombre"
                  id="name"
                  name="name"
                  variant="bordered"
                  {...register("name", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name && errors.name.message}
                />
              </div>

              <div className="flex flex-col w-11/12 my-2">
                <Input
                  type="text"
                  label="Lugar del evento"
                  labelPlacement="outside"
                  placeholder="Lugar"
                  id="venue"
                  name="venue"
                  variant="bordered"
                  {...register("venue", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.venue}
                  errorMessage={errors.venue && errors.venue.message}
                />
              </div>

              <div className="flex flex-col w-5/12 mr-10 my-2">
                <Select
                  label="Zona del evento"
                  labelPlacement="outside"
                  placeholder="Seleccioná un lugar"
                  className="w-full"
                  variant="bordered"
                  name="zone"
                  id="zone"
                  {...register("zone", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.zone}
                  errorMessage={errors.zone && errors.zone.message}
                >
                  <SelectItem key="CABA" value="CABA">
                    CABA
                  </SelectItem>
                  <SelectItem key="Zona Norte" value="Zona Norte">
                    Zona Norte
                  </SelectItem>
                  <SelectItem key="Zona Oeste" value="Zona Oeste">
                    Zona Oeste
                  </SelectItem>
                  <SelectItem key="Zona Sur" value="Zona Sur">
                    Zona Sur
                  </SelectItem>
                </Select>
              </div>

              <div className="flex flex-col w-5/12 my-2">
                <Select
                  label="Categoría"
                  labelPlacement="outside"
                  placeholder="Seleccioná una categoría"
                  className="w-full"
                  variant="bordered"
                  name="category"
                  id="category"
                  {...register("category", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.category}
                  errorMessage={errors.category && errors.category.message}
                >
                  <SelectItem key="Concierto de Rock" value="Concierto de Rock">
                    Rock
                  </SelectItem>
                  <SelectItem key="Concierto De Pop" value="Concierto De Pop">
                    Pop
                  </SelectItem>
                  <SelectItem
                    key="Fiesta Electrónica"
                    value="Fiesta Electrónica"
                  >
                    Electrónica
                  </SelectItem>
                  <SelectItem key="Concierto De Rap" value="Concierto De Rap">
                    Rap
                  </SelectItem>
                  <SelectItem
                    key="Festival De Bandas"
                    value="Festival De Bandas"
                  >
                    Festival
                  </SelectItem>
                  <SelectItem key="Fiesta" value="Fiesta">
                    Fiesta
                  </SelectItem>
                  <SelectItem key="Cumpleaños" value="Cumpleaños">
                    Cumpleaños
                  </SelectItem>
                  <SelectItem key="Reunión" value="Reunión">
                    Reunión
                  </SelectItem>
                </Select>
              </div>

              <div className="flex flex-col w-5/12 mr-10 my-2">
                <Input
                  type="text"
                  label="Calle"
                  labelPlacement="outside"
                  placeholder="Lugar"
                  id="street"
                  name="street"
                  variant="bordered"
                  {...register("street", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.street}
                  errorMessage={errors.street && errors.street.message}
                />
              </div>

              <div className="flex flex-col w-5/12 my-2">
                <Input
                  type="text"
                  label="Altura"
                  labelPlacement="outside"
                  placeholder="Lugar"
                  id="number"
                  name="number"
                  variant="bordered"
                  {...register("number", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.number}
                  errorMessage={errors.number && errors.number.message}
                />
              </div>

              <div className="flex flex-col w-5/12 mr-10 my-2">
                <Input
                  label="Fecha"
                  labelPlacement="outside"
                  placeholder=" "
                  type="date"
                  id="date"
                  name="date"
                  variant="bordered"
                  {...register("date", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.date}
                  errorMessage={errors.date && errors.date.message}
                />
              </div>

              <div className="flex flex-col w-5/12 my-2">
                <Input
                  label="Hora"
                  labelPlacement="outside"
                  placeholder=" "
                  type="time"
                  id="time"
                  name="time"
                  variant="bordered"
                  {...register("time", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.time}
                  errorMessage={errors.time && errors.time.message}
                />
              </div>

              <div className="flex flex-col w-11/12 my-2">
                <RadioGroup
                  label="Visibilidad del evento"
                  orientation="horizontal"
                  {...register("visibility", {
                    required: "Seleccioná la visibilidad del evento.",
                  })}
                  isInvalid={!!errors.visibility}
                  errorMessage={errors.visibility && errors.visibility.message}
                >
                  <Radio
                    id="private"
                    name="visibility"
                    value="private"
                    {...register("visibility", {
                      required: "Seleccioná la visibilidad del evento.",
                    })}
                    errorMessage={
                      errors.visibility && errors.visibility.message
                    }
                  >
                    Privado
                  </Radio>
                  <Radio
                    id="public"
                    name="visibility"
                    value="public"
                    {...register("visibility", {
                      required: "Seleccioná la visibilidad del evento.",
                    })}
                    errorMessage={
                      errors.visibility && errors.visibility.message
                    }
                  >
                    Público
                  </Radio>
                </RadioGroup>
              </div>

              <div className="flex flex-col w-11/12 my-2">
                <label htmlFor="cover">Portada del evento</label>
                <br />
                <input
                  className="bg-opacity border-solid border-1 border-light mb-2 rounded-md w-11/12"
                  type="file"
                  name="cover"
                  id="cover"
                  onChange={handleFileChange}
                />
                {errors.cover && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.cover.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-11/12 my-2">
                <Textarea
                  label="Descripción"
                  labelPlacement="outside"
                  variant="bordered"
                  name="description"
                  id="description"
                  placeholder="Descripción del evento"
                  {...register("description", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.description}
                  errorMessage={
                    errors.description && errors.description.message
                  }
                />
              </div>

              <div className="my-2">
                <label htmlFor="termsAndConditions">
                  Términos y Condiciones
                </label>
                <div className="flex gap-2 mt-2 mb-4">
                  <input
                    type="checkbox"
                    name="termsAndConditions"
                    id="termsAndConditions"
                    {...register("termsAndConditions", {
                      required: "Los términos y condiciones son obligatorios.",
                    })}
                  />
                  <p>
                    Aceptar{" "}
                    <span
                      onClick={onOpen}
                      className="text-lightblue cursor-pointer"
                    >
                      términos y condiciones
                    </span>
                  </p>
                </div>
                {errors.termsAndConditions && (
                  <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                    {errors.termsAndConditions.message}
                  </span>
                )}

                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Términos y condiciones.
                        </ModalHeader>
                        <ModalBody>
                          <TermsText></TermsText>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onPress={onClose}>
                            Entendido
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>

              <div className="flex w-full justify-start my-2">
                <Button
                  disabled={isCreatingEvent}
                  type="submit"
                  className="bg-green text-dark w-5/12 font-medium"
                >
                  Crear evento
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
      <h1 className="font-accent text-center text-2xl">
        Para poder crear un evento, por favor iniciá sesión
      </h1>
      <Link
        to="/iniciar-sesion"
        className="block bg-lightblue py-2 px-4 mx-auto rounded-2xl mt-8"
      >
        Iniciar Sesión
      </Link>
    </section>
  );
}

export { CreateEvent };
