import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../../index.js";
import { PuffLoader } from "react-spinners";
import { Button } from "@nextui-org/react";
import calendar from "../../assets/imgs/calendar-alt.png";
import clock from "../../assets/imgs/clock.png";
import mapMarker from "../../assets/imgs/map-marker-alt.png";
import colors from "../../assets/imgs/recurso-colores.png";
import ticket from "../../assets/imgs/ticket-alt.png";
import { format } from "date-fns";
function EventDetails() {
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const { eventId } = useParams();
  const [clickedBuy, setClickedBuy] = useState(false);

  console.log("click", clickedBuy);
  const handleShare = (eventId, eventName, eventDescription) => {
    console.log(eventId);
    let dataShare = {
      title: eventName,
      text: eventDescription,
      url: `http://localhost/ventra-API/${eventId}`,
    };
    navigator.share(dataShare).then((res) => {
      console.log("compartir el evento");
    });
  };

  function handleSubstract() {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  }

  function handleAdd() {
    if (amount < 10) {
      setAmount(amount + 1);
    }
  }

  // Función para formatear la fecha en dd-mm-yyyy
  const formatDate = (date) => {
    if (!date) return "";
    return format(new Date(date), "dd-MM-yyyy");
  };

  const ticketsPrice = event.price * amount;

  useEffect(() => {
    const getEvent = () => {
      setIsLoading(true);
      getEventById(eventId)
        .then((res) => {
          console.log(res.data[0]);
          setEvent(res.data[0]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    };
    getEvent();
  }, []);

  return (
    <>
      {isLoading && <PuffLoader />}
      <main className="bg-eventdetail md:px-20 px-10 grid grid-cols-12 gap-10">
        <div className="h-fit bg-dark rounded-3xl  col-span-4 mt-40 xl:mt-80 flex flex-col justify-evenly items-center mb-20">
          <img
            className="pb-2 w-full rounded-3xl "
            src={`http://localhost/ventra-API/${event.cover}`}
            alt={event.description}
          />
          <div className="flex w-3/4 gap-4 justify-start">
            <img
              className="w-auto h-auto object-none"
              src={ticket}
              alt="recurso ticket"
            />
            <h2 className="text-xl md:text-2xl my-2 font-accent">Entradas</h2>
          </div>

          <div className="flex items-center justify-between my-4 gap-2 bg-graydarker text-dark rounded-2xl ps-4 w-11/12">
            <div className="flex flex-col md:flex-row gap-4 text-light">
              <p>${event.price}</p>
              <p>Cantidad</p>
            </div>
            <div className="bg-graylighter py-2 px-4 rounded-xl  text-light">
              <div className="flex justify-evenly">
                <button className="me-2" onClick={handleSubstract}>
                  -
                </button>
                <p>{amount}</p>
                {amount >= event.ticketCount ? (
                  <p className="opacity-0">+</p>
                ) : (
                  <button className="ms-2" onClick={handleAdd}>
                    +
                  </button>
                )}
              </div>
            </div>
          </div>
          {amount >= event.ticketCount && event.ticketCount !== 0 ? (
            <p className="text-red-500 w-11/12 text-sm mb-2">
              Alcanzaste el límite de entradas que quedan para este evento.
            </p>
          ) : null}
          <p className="text-xs w-11/12 text-justify">
            Al valor indicado, se sumará el costo por servicio. <br /> En caso
            de reembolso, dicho costo no será reintegrado.
          </p>
          {amount > 0 && (
            <div className="flex gap-4 mt-2">
              <h4>Total:</h4>
              <p>${ticketsPrice}</p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => {
                handleShare(event._id, event.name, event.description);
              }}
              className="rounded-2xl font-medium text-sm  py-2 px-8 mt-4 w-fit text-light"
            >
              Compartir
            </Button>
            {!event.isFree ? (
              event.ticketCount === 0 ? (
                <>
                  <p className="rounded-2xl bg-red-700 py-2 px-4 mt-4 w-fit text-light">
                    Entradas Agotadas
                  </p>
                  <Link
                    to={`/reventa/${event._id}`}
                    className="bg-opacity2 rounded-2xl py-2 px-4 mb-4 text-xs border"
                  >
                    Comprar de reventa
                  </Link>
                </>
              ) : (
                <Link
                  to={
                    amount > 0
                      ? `/detalle/comprar/${event._id}/checkout/${amount}`
                      : "#"
                  }
                  className={`rounded-2xl font-medium text-sm bg-green py-2 px-8 my-4 w-fit text-dark ${
                    amount === 0 ? "pointer-events-none bg-graydarker" : ""
                  }`}
                >
                  Comprar
                </Link>
              )
            ) : (
              <p className="rounded-2xl bg-green py-2 px-4 my-4 w-fit text-dark">
                Evento Gratuito
              </p>
            )}
          </div>
        </div>
        {/* Acá comienza el titulo y datos */}
        <div className="col-span-8 mt-40 xl:mt-80 ">
          <h1 className="text-5xl font-accent mb-4">{event.name}</h1>
          <div className="flex gap-12 mb-8">
            <div className="flex items-center gap-4">
              <img className="w-6" src={calendar} alt="icono de calendario" />
              <p>
                <div>{formatDate(event.date)}</div>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img className="w-6" src={clock} alt="icono de reloj" />
              <p>{event.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 ">
            <img
              className="w-6"
              src={mapMarker}
              alt="icono de marcador en el mapa"
            />
            <p>
              {event.venue} - {event.address?.street} {event.address?.number} -
              ({event.zone})
            </p>
          </div>

          {event.visibility === "private" ? (
            <p className="text-red-400">
              Este es un evento privado, solo vos y quienes tengan el link
              pueden verlo.
            </p>
          ) : null}
          {/* DESCRIPCIÓN */}
          <div className="mt-20">
            <div className="flex flex-col mb-4">
              <h2 className="text-xl md:text-2xl pb-2 font-accent">
                Descripción
              </h2>
              <img
                className="w-12"
                src={colors}
                alt="recurso flechas colores"
              />
            </div>

            <p>{event.description}</p>
          </div>
        </div>
      </main>
    </>
  );
}

export { EventDetails };
