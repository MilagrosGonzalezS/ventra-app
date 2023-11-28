import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext.jsx";
import { createTicket, getEventById } from "../index.js";
import { Input } from "@nextui-org/react";
function PaymentForm() {
  const [tokenExists, setTokenExists] = useState(false);
  const navigation = useNavigate();
  const { name, eventId, amount } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState([]);
  const { auth } = useContext(AuthContext);
  const token = auth;

  const ticketData = {
    eventId: event._id,
    eventName: event.name,
    eventVenue: event.venue,
    eventDate: event.date,
    eventTime: event.time,
    eventPrice: event.price,
  };

  const handleSecurityCodeChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
    if (value.length > 4) {
      value = value.slice(0, 4); // Limitar a 4 caracteres
    }
    if (value.length > 2) {
      // Insertar una barra después del segundo carácter
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    e.target.value = value; // Actualizar el valor del campo
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      for (let i = 0; i < amount; i++) {
        await createTicket(ticketData)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      reset();
      navigation("/mis-entradas");
    } catch (error) {}
  };

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        setTokenExists(true);
      }
      setIsLoading(false);
    };
    getEventById(eventId).then((res) => {
      setEvent(res.data[0]);
      setIsLoading(false);
    });
    checkToken();
  }, []);

  return isLoading ? (
    <PuffLoader
      className="absolute left-1/2 -translate-x-1/2 top-10"
      color="#04b290"
    />
  ) : tokenExists ? (
    <>
      <main className="h-[90vh]">
        <h1 className="font-accent text-center text-2xl text-light pt-8">
          Realizar el pago
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="flex flex-wrap bg-opacity p-10"
        >
          <div className="flex flex-col w-2/4 p-3">
            <Input
              label="Nombre"
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
              label="Apellido"
              labelPlacement="outside"
              placeholder="Apellido"
              id="surname"
              name="surname"
              variant="bordered"
              {...register("surname", {
                required: "Campo obligatorio.",
              })}
              isInvalid={!!errors.surname}
              errorMessage={errors.surname && errors.surname.message}
            />
          </div>

          <div className="flex flex-col w-2/6 p-3">
            <Input
              type="number"
              label="Número de tarjeta"
              labelPlacement="outside"
              placeholder="xxxx xxxx xxxx xxxx"
              id="cardnumber"
              name="cardnumber"
              variant="bordered"
              onInput={(e) => {
                e.target.value = e.target.value.slice(0, 16);
              }}
              {...register("cardnumber", {
                required: "Campo obligatorio.",
              })}
              isInvalid={!!errors.cardnumber}
              errorMessage={errors.cardnumber && errors.cardnumber.message}
            />
          </div>

          <div className="flex flex-col w-2/6 p-3">
            <Input
              label="Fecha de vencimiento"
              labelPlacement="outside"
              placeholder="0"
              type="text"
              id="duedate"
              name="duedate"
              variant="bordered"
              onInput={(e) => {
                let val = e.target.value;
                val = val.replace(/[^0-9]/g, "");
                if (val.length > 2) {
                  val = val.slice(0, 2) + "/" + val.slice(2);
                }
                if (val.length > 5) {
                  val = val.slice(0, 5);
                }
                e.target.value = val;
              }}
              {...register("duedate", {
                required: "Campo obligatorio.",
              })}
              isInvalid={!!errors.duedate}
              errorMessage={errors.duedate && errors.duedate.message}
            />
          </div>

          <div className="flex flex-col w-2/6 p-3">
            <Input
              label="Código"
              labelPlacement="outside"
              placeholder="0"
              type="number"
              id="securitycode"
              name="securitycode"
              variant="bordered"
              onInput={(e) => {
                e.target.value = e.target.value.slice(0, 3);
              }}
              {...register("securitycode", {
                required: "Campo obligatorio.",
              })}
              isInvalid={!!errors.securitycode}
              errorMessage={errors.securitycode && errors.securitycode.message}
            />
          </div>

          <div className="flex w-full justify-start items-baseline gap-4 p-3">
            <p className="text-xl">{name}</p>
            <p>Cantidad de entradas: {amount} </p>
            <p>Costo total a pagar: ${amount * event.price} </p>
            <button
              type="submit"
              className="bg-lightblue py-2 px-4 rounded-xl hover:bg-emerald-600"
            >
              Finalizar Compra
            </button>
          </div>
        </form>
      </main>
    </>
  ) : (
    <div className="flex justify-center my-8">
      <h2 className="text-4xl font-accent text-center text-pink font-semibold">
        Tenés que iniciar sesión para realizar la compra
      </h2>
    </div>
  );
}

export { PaymentForm };
