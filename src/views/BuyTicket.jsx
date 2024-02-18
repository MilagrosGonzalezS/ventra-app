import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById } from "../index.js";
import { PuffLoader } from "react-spinners";
import { format } from "date-fns";

function BuyTicket() {
  const { eventId } = useParams();
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const getEvent = () => {
      setIsLoading(true);
      getEventById(eventId)
        .then((res) => {
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

  const ticketsPrice = event.price * amount;

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
  return (
    <>
      {isLoading ? (
        <PuffLoader
          className="absolute left-1/2 -translate-x-1/2 top-60"
          color="#04b290"
        />
      ) : (
        <section className="min-h-screen bg-opacity flex flex-col items-center justify-start p-10">
          <Link
            to={`/detalle/${event._id}`}
            className="hover:text-lightblue mb-2"
          >
            Volver
          </Link>
          <article className="w-full md:w-3/4 lg:w-2/4 bg-pattern mx-auto rounded-2xl border">
            <div className="flex justify-between bg-opacity p-4 rounded-t-2xl">
              <div>
                <h3>{event.name}</h3>
                <p>{event.category}</p>
              </div>
              <p>{formatDate(event.date)}</p>
            </div>
            <div className="p-6">
              <h4>Seleccioná tu entrada</h4>
              <div className="flex items-center justify-between my-6 gap-2 bg-lightblue text-dark rounded-2xl p-4">
                <div className="flex flex-col md:flex-row gap-4 font-bold">
                  <p>Entrada General</p>
                  <p>${event.price}</p>
                </div>
                <div className="bg-opacity py-2 px-4 rounded-xl  text-light">
                  <p>Cantidad</p>
                  <div className="flex justify-evenly">
                    <button onClick={handleSubstract}>-</button>
                    <p>{amount}</p>
                    {amount >= event.ticketCount ? (
                      <p className="opacity-0">+</p>
                    ) : (
                      <button onClick={handleAdd}>+</button>
                    )}
                  </div>
                </div>
              </div>
              {amount >= event.ticketCount ? (
                <p className="text-red-500">
                  Alcanzaste el límite de entradas que quedan para este evento.
                </p>
              ) : null}
            </div>
            <div className="flex items-center justify-end gap-6 bg-opacity p-4 rounded-b-2xl">
              <h4>Total:</h4>
              <p>${ticketsPrice}</p>
              {amount > 0 && (
                <Link
                  to={`/detalle/comprar/${event._id}/checkout/${amount}`}
                  className="bg-lightblue py-2 px-4 rounded-xl hover:bg-emerald-600 text-dark font-medium"
                >
                  Comprar
                </Link>
              )}
            </div>
          </article>
        </section>
      )}
    </>
  );
}

export { BuyTicket };
