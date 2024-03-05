import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import {
  createEvent,
  TermsText,
  getCategories,
  userData,
} from "../../index.js";
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
  const {
    isOpen: isOpenModalTerms,
    onOpen: onOpenModalTerms,
    onOpenChange: onOpenChangeModalTerms,
  } = useDisclosure();
  const {
    isOpen: isOpenModalCreated,
    onOpen: onOpenModalCreated,
    onOpenChange: onOpenChangeModalCreated,
  } = useDisclosure();
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
  const [status, setStatus] = useState();
  const [user, setUser] = useState({});
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [venue, setVenue] = useState("");
  const [nextView, setNextView] = useState(false);
  const [dataCreateEvent, setDataCreateEvent] = useState({});
  const [cover, setCover] = useState(null);
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    const data = userData();
    data.then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  //TRAER CATEGORIAS PARA SELECT
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleNextView = (data, event) => {
    event.preventDefault();
    setNextView(true);
    setDataCreateEvent(data);
  };

  const handlePrevView = () => {
    setNextView(false);
    console.log(dataCreateEvent);
  };

  const handleFullForm = (data, event) => {
    let dataEvent = { ...data };
    onSubmit(dataEvent, event);
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setIsCreatingEvent(true);
    data =
      price === 0
        ? { ...data, cover, isFree, price }
        : { ...data, isFree, cover };
    try {
      await createEvent(data);
      setIsCreatingEvent(false);
      //MENSAJE
      console.log(data);
      toast.success("¡Evento Creado!");
      setTimeout(() => {
        if (!user.completeData) {
          onOpenModalCreated();
        } else {
          navigate("/mi-cuenta");
        }
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
  ) : tokenExists && !nextView ? (
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
              onSubmit={handleSubmit(handleNextView)}
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
                  defaultValue={
                    dataCreateEvent ? dataCreateEvent.name : undefined
                  }
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
                  defaultValue={
                    dataCreateEvent ? dataCreateEvent.venue : undefined
                  }
                  onChange={(e) => {
                    setVenue(e.target.value);
                  }}
                  value={venue}
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
                  {...(Object.keys(dataCreateEvent).length > 0 && {
                    defaultSelectedKeys: [dataCreateEvent.zone],
                  })}
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
                  {...(Object.keys(dataCreateEvent).length > 0 && {
                    defaultSelectedKeys: [dataCreateEvent.category],
                  })}
                >
                  {categories.map((category) => (
                    <SelectItem key={category.name}>{category.name}</SelectItem>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col w-5/12 mr-10 my-2">
                <Input
                  label="Calle"
                  labelPlacement="outside"
                  type="text"
                  placeholder="Lugar"
                  id="street"
                  name="street"
                  variant="bordered"
                  {...register("street", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.street}
                  errorMessage={errors.street && errors.street.message}
                  defaultValue={
                    dataCreateEvent ? dataCreateEvent.street : undefined
                  }
                />
              </div>

              <div className="flex flex-col w-5/12 my-2">
                <Input
                  type="text"
                  label="Altura"
                  labelPlacement="outside"
                  placeholder="Número"
                  id="number"
                  name="number"
                  variant="bordered"
                  {...register("number", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.number}
                  errorMessage={errors.number && errors.number.message}
                  defaultValue={
                    dataCreateEvent ? dataCreateEvent.number : undefined
                  }
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
                  defaultValue={
                    dataCreateEvent ? dataCreateEvent.date : undefined
                  }
                />
              </div>

              <div className="flex flex-col w-5/12 my-2">
                <Input
                  label="Hora"
                  labelPlacement="outside"
                  placeholder="21:00"
                  type="time"
                  id="time"
                  name="time"
                  variant="bordered"
                  {...register("time", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.time}
                  errorMessage={errors.time && errors.time.message}
                  defaultValue={
                    dataCreateEvent ? dataCreateEvent.time : undefined
                  }
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
                  defaultValue={
                    dataCreateEvent ? dataCreateEvent.visibility : undefined
                  }
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
                    defaultChecked={
                      dataCreateEvent
                        ? dataCreateEvent.visibility === "private"
                        : undefined
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
                    defaultChecked={
                      dataCreateEvent
                        ? dataCreateEvent.visibility === "public"
                        : undefined
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
                  defaultValue={
                    dataCreateEvent ? dataCreateEvent.cover : undefined
                  }
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
                  defaultValue={
                    dataCreateEvent ? dataCreateEvent.description : undefined
                  }
                />
              </div>

              <div className="flex w-full justify-start my-2">
                <Button
                  type="submit"
                  className="bg-green text-dark w-5/12 font-medium"
                >
                  Continuar
                </Button>
              </div>
            </form>
          </div>
          <div className="col-span-6 w-6/12">
            <img className="w-10/12 mx-auto" src={formpic}></img>
          </div>
        </div>
      </main>
    </>
  ) : tokenExists && nextView ? (
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
            <h2 className="mb-8 text-xl">
              Entradas para {dataCreateEvent.name}
            </h2>
            <form
              onSubmit={handleSubmit(handleFullForm)}
              encType="multipart/form-data"
              className="flex flex-wrap bg-opacity w-full "
            >
              <div className="flex flex-col w-11/12 my-2">
                <div>
                  <RadioGroup
                    label="¿Querés vender entradas?"
                    orientation="horizontal"
                    {...register("isFree", {
                      required: "Seleccioná si deseás vender entradas o no.",
                    })}
                    isInvalid={!!errors.isFree}
                    errorMessage={errors.isFree && errors.isFree.message}
                    defaultValue={
                      dataCreateEvent ? dataCreateEvent.isFree : undefined
                    }
                  >
                    <Radio
                      id="false"
                      name="isFree"
                      value="false"
                      {...register("isFree", {
                        required: "Seleccioná una opción.",
                      })}
                      errorMessage={errors.isFree && errors.isFree.message}
                      defaultChecked={
                        dataCreateEvent
                          ? dataCreateEvent.isFree === "false"
                          : undefined
                      }
                      onChange={(e) => {
                        setPrice(e.target.value === "true" ? 0 : undefined);

                        setIsFree(e.target.value === "true" ? true : false);
                      }}
                    >
                      Sí, deseo vender entradas
                    </Radio>
                    <Radio
                      id="true"
                      name="isFree"
                      value="true"
                      {...register("isFree", {
                        required: "Seleccioná una opción.",
                      })}
                      errorMessage={errors.isFree && errors.isFree.message}
                      defaultChecked={
                        dataCreateEvent
                          ? dataCreateEvent.isFree === "true"
                          : undefined
                      }
                      onChange={(e) => {
                        setPrice(e.target.value === "false" ? 0 : undefined);

                        setIsFree(e.target.value === "false" ? false : true);
                      }}
                    >
                      No, no deseo vender entradas
                    </Radio>
                  </RadioGroup>
                </div>
              </div>

              {!isFree && (
                <div className="flex flex-col w-11/12 my-2">
                  <Input
                    label="Precio"
                    labelPlacement="outside"
                    type="text"
                    placeholder="0.00"
                    id="price"
                    name="price"
                    variant="bordered"
                    {...register("price", {
                      required: "Campo obligatorio.",
                    })}
                    isInvalid={!!errors.price}
                    errorMessage={errors.price && errors.price.message}
                    onChange={(e) => {
                      const input = e.target.value;
                      // Filtrar caracteres no numéricos
                      const filteredInput = input.replace(/\D/g, "");
                      setPrice(filteredInput);
                    }}
                    value={price}
                  />
                </div>
              )}
              <div className="flex flex-col w-11/12 my-2">
                <Input
                  label="Cantidad de tickets"
                  labelPlacement="outside"
                  placeholder="0"
                  type="text"
                  id="ticketCount"
                  name="ticketCount"
                  variant="bordered"
                  {...register("ticketCount", {
                    required: "Campo obligatorio.",
                  })}
                  isInvalid={!!errors.ticketCount}
                  errorMessage={
                    errors.ticketCount && errors.ticketCount.message
                  }
                  onChange={(e) => {
                    const inputQ = e.target.value;
                    // Filtrar caracteres no numéricos
                    const filteredInput = inputQ.replace(/\D/g, "");
                    setQuantity(filteredInput);
                  }}
                  value={quantity}
                />
              </div>

              <div className="flex flex-col w-11/12 my-2">
                <div>
                  <RadioGroup
                    label="¿Desea publicar su evento en cuanto lo aprobemos?"
                    orientation="horizontal"
                    {...register("status", {
                      required:
                        "Seleccioná si deseás publicar el evento o no cuando esté aprobado.",
                    })}
                    isInvalid={!!errors.status}
                    errorMessage={errors.status && errors.status.message}
                    defaultValue={
                      dataCreateEvent ? dataCreateEvent.status : undefined
                    }
                  >
                    <Radio
                      id="false"
                      name="status"
                      value="true"
                      {...register("status", {
                        required: "Seleccioná una opción.",
                      })}
                      errorMessage={errors.status && errors.status.message}
                      defaultChecked={
                        dataCreateEvent ? dataCreateEvent.status : undefined
                      }
                    >
                      Sí, deseo publicarlo inmediatamente.
                    </Radio>
                    <Radio
                      id="true"
                      name="status"
                      value="false"
                      {...register("status", {
                        required: "Seleccioná una opción.",
                      })}
                      errorMessage={errors.status && errors.status.message}
                      defaultChecked={
                        dataCreateEvent ? dataCreateEvent.status : undefined
                      }
                    >
                      No, lo publicaré luego.
                    </Radio>
                  </RadioGroup>
                </div>
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
                      onClick={onOpenModalTerms}
                      className="text-lightblue cursor-pointer"
                    >
                      términos y condiciones
                    </span>
                  </p>
                </div>
                {errors.termsAndConditions && (
                  <span className="text-xs xl:text-base text-red-500 block text-left -translate-y-4">
                    {errors.termsAndConditions.message}
                  </span>
                )}

                <Modal
                  isOpen={isOpenModalTerms}
                  onOpenChange={onOpenChangeModalTerms}
                >
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
              <div className="flex w-full justify-start my-2 gap-2">
                <button
                  disabled={isCreatingEvent}
                  onClick={() => {
                    handlePrevView();
                  }}
                  className="bg-graydarker text-white w-5/12 font-medium rounded-lg"
                  type="button"
                >
                  Volver
                </button>
                <Button
                  disabled={isCreatingEvent}
                  type="submit"
                  className="bg-green text-dark w-5/12 font-medium"
                >
                  Crear evento
                </Button>
                <Toaster position="center-center"></Toaster>
              </div>
            </form>
          </div>
          <div className="col-span-6 w-6/12">
            <img className="w-10/12 mx-auto" src={formpic}></img>
          </div>
        </div>
        <Modal isOpen={isOpenModalCreated}>
          <ModalContent>
            <ModalHeader>Evento Creado</ModalHeader>
            <ModalBody>
              <p>Tu evento se ha creado exitosamente.</p>
              <p>
                Para poder publicarlo deberás completar tus datos como creador
                del evento.
              </p>
              <p>
                Puedes hacerlo luego pero es necesario para que Ventra apruebe
                tu evento, de otra manera no podrás publicarlo.
              </p>
              <p>Una vez aprobado podrás elegir cuando se publica.</p>
            </ModalBody>
            <ModalFooter>
              <Link to="/mi-cuenta">
                <Button color="default" onPress={onOpenChangeModalCreated}>
                  Completar datos luego
                </Button>
              </Link>
              <Link to="/mi-cuenta/datos-creador">
                <Button color="primary" onPress={onOpenChangeModalCreated}>
                  Completar datos ahora
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
      ;
    </>
  ) : (
    <section className="min-h-screen flex flex-col justify-start mt-12">
      <h1 className="font-accent text-center mt-32 text-2xl">
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
