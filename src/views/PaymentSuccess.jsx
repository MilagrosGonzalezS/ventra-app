import { useState, useEffect, useContext } from "react";
// import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext.jsx";
import { createTicket, getEventById } from "../index.js";

function PaymentSuccess() {
  // const navigation = useNavigate();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  const [tokenExists, setTokenExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState([]);

  const { name, eventId, amount, timestamp } = useParams();
  const { auth } = useContext(AuthContext);
  const token = auth;

  const ticketData = {
    eventId: event._id,
    eventName: event.name,
    eventVenue: event.venue,
    eventDate: event.date,
    eventTime: event.time,
    eventPrice: event.price,
    timestamp: timestamp,
  };

  // const handleSecurityCodeChange = (e) => {
  //   let value = e.target.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
  //   if (value.length > 4) {
  //     value = value.slice(0, 4); // Limitar a 4 caracteres
  //   }
  //   if (value.length > 2) {
  //     // Insertar una barra después del segundo carácter
  //     value = value.slice(0, 2) + "/" + value.slice(2);
  //   }

  //   e.target.value = value; // Actualizar el valor del campo
  // };

  // const onSubmit = async (data, event) => {
  //   event.preventDefault();
  //   try {
  //     for (let i = 0; i < amount; i++) {
  //       await createTicket(ticketData)
  //         .then((res) => {
  //           console.log(res);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //     toast.success("¡Compra finalizada!");
  //     setTimeout(() => {
  //       navigation("/mi-cuenta");
  //     }, 1500);
  //   } catch (error) {}
  // };

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

  useEffect(() => {
    const ticketCreation = async () => {
      try {
        for (let i = 0; i < amount; i++) {
          await createTicket(ticketData)
            .then((res) => {
              console.log(res);
              // toast.success("¡Compra finalizada!");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        // setTimeout(() => {
        //   navigation("/mi-cuenta");
        // }, 1500);
      } catch (error) {}
    };

    ticketCreation();
  }, [event]);

  return isLoading ? (
    <PuffLoader
      className="absolute left-1/2 -translate-x-1/2 top-10"
      color="#04b290"
    />
  ) : tokenExists ? (
    <>
      <main className="h-[90vh] p-10">
        <h1 className="mt-24">Tu compra:</h1>
        <h2>
          {name}x{amount}
        </h2>
        <p>
          Total: ${event.price * amount + (event.price * amount * 10) / 100}{" "}
        </p>
        <Link to="/mi-cuenta">Ver mis Tickets</Link>
        {/* <h1 className="font-accent font-medium text-orange text-3xl ml-3 py-8">
          Realizar el pago
        </h1> */}
        {/* <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="flex flex-wrap bg-opacity"
        >
          <div className="flex flex-col w-full md:w-2/4 p-3">
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

          <div className="flex flex-col w-full md:w-2/4 p-3">
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

          <div className="flex flex-col w-2/4 md:w-2/6 p-3">
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

          <div className="flex flex-col w-2/4 md:w-2/6 p-3">
            <Input
              label="Vencimiento"
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
              type="text"
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

          <div className="flex flex-col w-full justify-start items-baseline gap-4 p-3">
            <p className="text-xl">{name}</p>
            <p>Cantidad de entradas: {amount} </p>
            <p>Costo total a pagar: ${amount * event.price} </p>
            <button
              type="submit"
              className="bg-lightblue py-2 px-4 rounded-xl hover:bg-emerald-600 font-medium text-dark"
            >
              Finalizar Compra
            </button>
            
          </div>
        </form> */}
        {/* <Toaster
          position="center-center"
          toastOptions={{
            success: {
              style: {
                background: "#141414",
                color: "#FCFCFC",
              },
            },
          }}
        /> */}
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

export { PaymentSuccess };