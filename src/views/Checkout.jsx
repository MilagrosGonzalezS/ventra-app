import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById, createTicket } from "../index.js";
import { PuffLoader } from "react-spinners";

function Checkout() {
  const { eventId, amount } = useParams();
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigate();

  const ticketsPrice = event.price * amount;
  const servicePrice = (ticketsPrice * 10) / 100;
  const totalPrice = ticketsPrice + servicePrice;

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

  const ticketData = {
    eventId: event._id,
    eventName: event.name,
    eventVenue: event.venue,
    eventDate: event.date,
    eventTime: event.time,
    eventPrice: event.price,
  };

  const handleCreateTicket = async () => {
    console.log(ticketData);
    for (let i = 0; i < amount; i++) {
      await createTicket(ticketData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    navigation("/mis-entradas");
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
            to={`/detalle/comprar/${event._id}`}
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
              <p>{event.date ? event.date.slice(0, 10) : ""}</p>
            </div>
            <div className="p-6">
              <h4>Resumen de compra</h4>
              <div className="my-6 bg-lightblue text-dark rounded-2xl p-4 font-bold">
                <div className="flex items-center justify-between">
                  <p>Entrada General x{amount}</p>
                  <p>${ticketsPrice}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Cargo por servicio</p>
                  <p>${servicePrice}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-6 bg-opacity p-4 rounded-b-2xl">
              <h4>Total:</h4>
              <p>${totalPrice}</p>
              <Link
                to={`/detalle/comprar/pago/${event.name}/${event._id}/${amount}`}
                className="bg-lightblue py-2 px-4 rounded-xl hover:bg-emerald-600 text-dark font-medium"
              >
                Ir a pagar
              </Link>
            </div>
          </article>
        </section>
      )}
    </>
  );
}

export { Checkout };
