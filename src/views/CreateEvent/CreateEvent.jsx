import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { createEvent } from "../../index.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
function CreateEvent() {
  const [tokenExists, setTokenExists] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
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
    console.log(cover);
    console.log("data", data);
    console.log("price", price);
    try {
      await createEvent(data);
      setIsCreatingEvent(false);
      //MENSAJE
      reset();
      navigate("/mis-eventos");
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
      <main className="h-[90vh] bg-login">
        {/* <h1 className="font-accent text-2xl text-green">Creá tu evento</h1> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="flex flex-wrap bg-opacity p-10"
        >
          <div className="flex flex-col w-2/4 p-3">
            <Input
              label="Nombre del Evento"
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

          <div className="flex flex-col w-2/4 p-3">
            <Input
              type="text"
              label="Lugar del Evento"
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

          <div className="flex flex-col w-2/6 p-3">
            <Select
              label="Zona del evento"
              labelPlacement="outside"
              placeholder="Selecciona un lugar"
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

          <div className="flex flex-col w-2/6 p-3">
            <Select
              label="Categoría"
              labelPlacement="outside"
              placeholder="Selecciona una categoría"
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
                Concierto de Rock
              </SelectItem>
              <SelectItem key="Concierto De Pop" value="Concierto De Pop">
                Concierto De Pop
              </SelectItem>
              <SelectItem key="Fiesta Electrónica" value="Fiesta Electrónica">
                Fiesta Electrónica
              </SelectItem>
              <SelectItem key="Concierto De Rap" value="Concierto De Rap">
                Concierto De Rap
              </SelectItem>
              <SelectItem key="Festival De Bandas" value="Festival De Bandas">
                Festival De Bandas
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

          {/* <div className="flex flex-col w-2/6 p-3">
            <RadioGroup
              label="Tipo de Evento"
              orientation="horizontal"
              {...register("isFree", {
                required: "Selecciona la visibilidad del evento.",
              })}
              isInvalid={!!errors.isFree}
              errorMessage={errors.isFree && errors.isFree.message}
            >
              <Radio
                id="freeEvent"
                name="isFree"
                value="true"
                onChange={() => {
                  setIsFree(true);
                  setPrice(0);
                }}
                {...register("isFree", {
                  required: "Selecciona la visibilidad del evento.",
                })}
                isInvalid={!!errors.isFree}
                errorMessage={errors.isFree && errors.isFree.message}
              >
                Gratuito
              </Radio>
              <Radio
                id="payEvent"
                name="isFree"
                value="false"
                onChange={() => {
                  setIsFree(false);
                  setPrice();
                }}
                {...register("isFree", {
                  required: "Selecciona la visibilidad del evento.",
                })}
                isInvalid={!!errors.isFree}
                errorMessage={errors.isFree && errors.isFree.message}
              >
                Pago
              </Radio>
            </RadioGroup>
          </div> */}

          <div className="flex flex-col w-2/6 p-2">
            <label htmlFor="isFree" className="mr-2 mb-2 text-sm">
              ¿Es un evento gratuito o pago?
            </label>

            <div>
              <input
                type="radio"
                id="freeEvent"
                name="isFree"
                value="true"
                {...register("isFree", {
                  required: "Selecciona la visibilidad del evento",
                })}
                onChange={() => {
                  setIsFree(true);
                  setPrice(0);
                }}
              />
              <label htmlFor="freeEvent" className="mr-2 mx-2">
                Gratuito
              </label>
              <input
                type="radio"
                id="payEvent"
                name="isFree"
                value="false"
                {...register("isFree", {
                  required: "Selecciona la visibilidad del evento",
                })}
                onChange={() => {
                  setIsFree(false);
                  setPrice();
                }}
              />
              <label htmlFor="payEvent" className="mr-2 mx-2">
                Pago
              </label>
              {errors.isFree && (
                <span className="text-xs xl:text-base block text-left -translate-y-4 mt-4 text-red-500">
                  {errors.isFree.message}
                </span>
              )}
            </div>
          </div>

          {!isFree && (
            <div className="w-2/6 p-3">
              <Input
                label="Precio"
                labelPlacement="outside"
                type="number"
                placeholder="0.00"
                id="price"
                name="price"
                variant="bordered"
                onChange={(e) => setPrice(e.target.value)}
                {...register("price", {
                  required: "Campo obligatorio.",
                })}
                isInvalid={!!errors.price}
                errorMessage={errors.price && errors.price.message}
              />
            </div>
          )}

          <div className="flex flex-col w-2/6 p-3">
            <Input
              label="Cantidad de Tickets"
              labelPlacement="outside"
              placeholder="0"
              type="number"
              id="ticketCount"
              name="ticketCount"
              variant="bordered"
              {...register("ticketCount", {
                required: "Campo obligatorio.",
              })}
              isInvalid={!!errors.ticketCount}
              errorMessage={errors.ticketCount && errors.ticketCount.message}
            />
          </div>

          <div className="flex flex-col w-2/6 p-3">
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

          <div className="flex flex-col w-2/6 p-3">
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

          <div className="flex flex-col w-2/6 p-3">
            <RadioGroup
              label="Visibilidad del evento"
              orientation="horizontal"
              {...register("visibility", {
                required: "Selecciona la visibilidad del evento.",
              })}
              isInvalid={!!errors.visibility}
              errorMessage={errors.visibility && errors.visibility.message}
            >
              <Radio
                id="private"
                name="visibility"
                value="private"
                {...register("visibility", {
                  required: "Selecciona la visibilidad del evento.",
                })}
                errorMessage={errors.visibility && errors.visibility.message}
              >
                Privado
              </Radio>
              <Radio
                id="public"
                name="visibility"
                value="public"
                {...register("visibility", {
                  required: "Selecciona la visibilidad del evento.",
                })}
                errorMessage={errors.visibility && errors.visibility.message}
              >
                Público
              </Radio>
            </RadioGroup>
          </div>

          {/* <div className="flex flex-col w-2/6 p-3">
            <Input
              label="Portada del Evento"
              labelPlacement="outside"
              placeholder=" "
              type="file"
              id="cover"
              name="cover"
              variant="bordered"
              onChange={handleFileChange}
              {...register("cover", {})}
              isInvalid={!!errors.cover}
              errorMessage={errors.cover && errors.cover.message}
            />
          </div> */}
          <div className="flex flex-col w-2/6 p-3">
            <label htmlFor="cover">Portada del evento</label>
            <br />
            <input
              className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
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

          <div className="flex flex-col w-full p-3">
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
              errorMessage={errors.description && errors.description.message}
            />
          </div>

          {/* <div className="p-3">
            <RadioGroup
              {...register("termsAndConditions", {
                required: "Los términos y condiciones son obligatorios.",
              })}
              isInvalid={!!errors.termsAndConditions}
              errorMessage={
                errors.termsAndConditions && errors.termsAndConditions.message
              }
            >
              <Radio
                id="termsAndConditions"
                name="termsAndConditions"
                value="termsAndConditions"
                {...register("termsAndConditions", {
                  required: "Los términos y condiciones son obligatorios.",
                })}
                errorMessage={
                  errors.termsAndConditions && errors.termsAndConditions.message
                }
              >
                Aceptar los Términos y condiciones.
              </Radio>
            </RadioGroup>
          </div> */}
          <div className="p-3">
            <label htmlFor="termsAndConditions">Terminos y Condiciones</label>
            <br />
            <input
              className="bg-gray-700 border-solid border-b-2 border-t-0 border-l-0 border-r-0 border-lightblue mb-8 mt-1 px-2 rounded-md w-auto"
              type="checkbox"
              name="termsAndConditions"
              id="termsAndConditions"
              {...register("termsAndConditions", {
                required: "Los términos y condiciones son obligatorios.",
              })}
            />
            {errors.termsAndConditions && (
              <span className="text-xs xl:text-base text-light block text-left -translate-y-4">
                {errors.termsAndConditions.message}
              </span>
            )}
          </div>
          <div className="flex w-full justify-start p-3">
            <Button
              disabled={isCreatingEvent}
              type="submit"
              className="bg-green text-dark w-5/12"
            >
              Crear evento
            </Button>
          </div>
        </form>
      </main>
    </>
  ) : (
    <div className="flex justify-center my-8">
      <h1 className="text-4xl font-accent text-center text-pink font-semibold">
        TENÉS QUE INICAR SESIÓN <br /> PARA PODER CREAR UN EVENTO
      </h1>
    </div>
  );
}

export { CreateEvent };
